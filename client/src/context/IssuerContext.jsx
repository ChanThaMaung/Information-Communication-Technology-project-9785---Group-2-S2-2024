import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/Issuer/IssuerConstants";
import { getEthereumContract } from "./GlobalFunctions/getEthereumContract";

export const IssuerContext = React.createContext();

const { ethereum } = window;

export const IssuerProvider = ({ children }) => {
  const [issuerTransactions, setIssuerTransactions] = useState([]);
  const [isLoadingIssuer, setIsLoadingIssuer] = useState(false);
  const [currentIssuerAccount, setCurrentIssuerAccount] = useState("");
  const [issuerTransactionCount, setIssuerTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [formIssuerData, setFormIssuerData] = useState({
    amount: 0,
    end_date: 0,
    status: "",
  });

  const handleChangeIssuer = (e, name) => {
    setFormIssuerData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
  };

  const fetchIssuerTransactions = async () => {
    try {
      const issuerContract = await getEthereumContract(
        contractAddress,
        contractABI,
        { ethereum }
      );
      const transactions = await issuerContract.getAllTransactions();
      setIssuerTransactions(transactions);
      console.log(transactions);
    } catch (error) {
      console.log(error);
    }
  };
  const connectIssuerWallet = async (account) => {
    setCurrentIssuerAccount(account);
    // fetchIssuerTransactions();
  };

  const sendIssuerTransaction = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentAccount = accounts[0];

      const { amount, end_date, status } = formIssuerData;
      console.log(amount, end_date, status);
      const issuerContract = await getEthereumContract(
        contractAddress,
        contractABI,
        { ethereum }
      );
      const parsedAmount = Math.max(0, Math.floor(Number(credit_amount)));

      const transactionHash = await issuerContract.addToBlockChain(
        parsedAmount,
        status,
        end_date,
        {
          from: currentAccount,
          gas: "0x5208",
        }
      );

      setIsLoadingIssuer(true);
      console.log(`Loading: ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoadingIssuer(false);
      console.log(`Success: ${transactionHash.hash}`);

      const transactionCount = await issuerContract.getTransactionCount();

      setIssuerTransactionCount(transactionCount.toNumber);
      console.log(`Transaction Count: ${transactionCount}`);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
    if (currentIssuerAccount) {
      fetchIssuerTransactions();
    }
  }, []);

  return (
    <IssuerContext.Provider
      value={{
        connectIssuerWallet,
        currentIssuerAccount,
        formIssuerData,
        setFormIssuerData,
        sendIssuerTransaction,
        handleChangeIssuer,
        issuerTransactions,
      }}
    >
      {children}
    </IssuerContext.Provider>
  );
};
