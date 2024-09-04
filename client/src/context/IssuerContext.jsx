import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/IssuerConstants";
import { getEthereumContract } from "./GlobalFunctions/getEthereumContract";
import { connectWallet as connectWalletFunction } from "./GlobalFunctions/connectWallet";

export const IssuerContext = React.createContext();

const { ethereum } = window;

export const IssuerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  const [formData, setFormData] = useState({
    amount: "",
    end_date: "",
    status: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please install Metamask");

    const accounts = await ethereum.request({ method: "eth_accounts" });

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
      const { amount, end_date, status } = formData;
      console.log(amount, end_date, status);
      const issuerContract = await getEthereumContract(contractAddress, contractABI, {ethereum});
      const transactionHash = await issuerContract.addToBlockChain(amount, end_date, status, {
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


    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <IssuerContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        sendTransaction,
        handleChange,
      }}
    >
      {children}
    </IssuerContext.Provider>
  );
};
