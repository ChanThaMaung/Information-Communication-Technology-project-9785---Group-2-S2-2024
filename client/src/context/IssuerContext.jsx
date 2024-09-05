import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/IssuerConstants";
import { getEthereumContract } from "./GlobalFunctions/getEthereumContract";
import { connectWallet as connectWalletFunction } from "./GlobalFunctions/connectWallet";

export const IssuerContext = React.createContext();

const { ethereum } = window;

export const IssuerProvider = ({ children }) => {
  
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  const [formData, setFormData] = useState({
    amount: "",
    date_submit: "",
    status: "",
  });

  const handleChange = (e, name) => {
    let value = e.target.value;
    if (name === "date_submit") {
      value = dateStringToUint256(value);
    }
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  
  // Add this helper function
  const dateStringToUint256 = (dateString) => {
    const date = new Date(dateString);
    console.log(date.getTime() / 1000);
    return Math.floor(date.getTime() / 1000);
  };

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please install Metamask");

    const accounts = await ethereum.request({ method: "eth_accounts" });

  };

  const fetchTransactions = async () => {
    try {
      const issuerContract = await getEthereumContract(contractAddress, contractABI, {ethereum});
      const transactions = await issuerContract.getAllTransactions();
      setTransactions(transactions);
      console.log(transactions);
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
      const account = await connectWalletFunction();
      setCurrentAccount(account);
      const issuerContract = await getEthereumContract(contractAddress, contractABI, {ethereum});
      const transactions = await issuerContract.getAllTransactions();
      console.log(transactions);
  };

  const sendTransaction = async () => {
    try {
      if (!window.ethereum) return alert("Please install metamask");
      const { amount, date_submit, status } = formData;
      console.log(amount, date_submit, status);
      const issuerContract = await getEthereumContract(contractAddress, contractABI, {ethereum});
      const transactionHash = await issuerContract.addToBlockChain(amount, date_submit, status, {
        from: currentAccount,
        gas: '0x5208',
      });

      setIsLoading(true);
      console.log(`Loading: ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success: ${transactionHash.hash}`);

      const transactionCount = await issuerContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber);
      console.log(`Transaction Count: ${transactionCount}`);

      await fetchTransactions();

    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
    if (currentAccount) {
      fetchTransactions();
    }
  }, []);

  return (
    <IssuerContext.Provider
      value={{
        formData,
        setFormData,
        sendTransaction,
        handleChange,
        transactions,
      }}
    >
      {children}
    </IssuerContext.Provider>
  );
};
