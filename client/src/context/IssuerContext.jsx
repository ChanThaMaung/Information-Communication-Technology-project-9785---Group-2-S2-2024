import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/Issuer/IssuerConstants";
import { getEthereumContract } from "./GlobalFunctions/getEthereumContract";
import axios from "axios";
import { convertDateFormat } from "../scripts/handleDateFormat";

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
    status: 0,
    issued_date: "",
    verification_status: 0,
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


  const connectIssuerWallet = async (account) => {
    setCurrentIssuerAccount(account);
  };

  const sendIssuerTransaction = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentAccount = accounts[0];

      const { amount, end_date, status, issued_date, verification_status } = formIssuerData;
      console.log(amount, end_date, status, issued_date, verification_status);

      const issuerContract = await getEthereumContract(
        contractAddress,
        contractABI,
        { ethereum }
      );
      const parsedAmount = Math.floor(Number(amount));

      const transactionHash = await issuerContract.addToBlockChain(
        parsedAmount,
        status,
        end_date,
        issued_date,
        verification_status,
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
      const formattedRetirementDate = convertDateFormat(end_date);
      const formattedIssuedDate = convertDateFormat(issued_date);

      const response = await axios.post('http://localhost:3000/issuer/create', {
        issuerAddress: currentAccount,
        credit_amount: amount,
        active_status: status,
        date_issued: formattedIssuedDate,
        end_date: formattedRetirementDate,
        verification_status: verification_status,
        transaction_hash: transactionHash.hash
      });
      console.log('Data created:', response.data);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
    if (currentIssuerAccount) {
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
