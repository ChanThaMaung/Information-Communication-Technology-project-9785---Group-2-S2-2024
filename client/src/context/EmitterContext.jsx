import React, { useEffect, useState } from "react";
import {
  contractABI,
  contractAddress
} from "../utils/Emitter/EmitterConstants";
import { getEthereumContract } from "./GlobalFunctions/getEthereumContract";

export const EmitterContext = React.createContext();

const { ethereum } = window;

export const EmitterProvider = ({ children }) => {
  const [emitterTransactions, setEmitterTransactions] = useState([]);
  const [isLoadingEmitter, setIsLoadingEmitter] = useState(false);
  const [currentEmitterAccount, setCurrentEmitterAccount] = useState("");
  const [emitterTransactionCount, setEmitterTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [formEmitterData, setFormEmitterData] = useState({
    credit_amount: 0,
    end_date: 0,
    status: "",
  });

  const handleEmitterChange = (e, name) => {
    setFormEmitterData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setCurrentEmitterAccount(accounts[0]);
      // fetchEmitterTransactions();
    }
  };

  const fetchEmitterTransactions = async () => {
    try {
      const emitterContract = await getEthereumContract(
        contractAddress,
        contractABI,
        { ethereum }
      );
      const availableTransactions = await emitterContract.getAllTransactions();
      console.log("Raw transactions data:", availableTransactions);
      setEmitterTransactions(availableTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const connectEmitterWallet = async (account) => {
    setCurrentEmitterAccount(account);
    fetchEmitterTransactions();
  };

  const sendEmitterTransaction = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentAccount = accounts[0];
      const { credit_amount, end_date, status } = formEmitterData;
      const emitterContract = await getEthereumContract(
        contractAddress,
        contractABI,
        { ethereum }
      );
      const parsedAmount = Math.floor(Number(credit_amount));

      const transactionHash = await emitterContract.addToBlockChain(
        parsedAmount,
        status,
        end_date,
        { from: currentAccount, gas: "0x5208", }
      );

      setIsLoadingEmitter(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoadingEmitter(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await emitterContract.getTransactionCount();
      setEmitterTransactionCount(transactionCount.toNumber());

      fetchEmitterTransactions();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <EmitterContext.Provider
      value={{
        connectEmitterWallet,
        currentEmitterAccount,
        formEmitterData,
        setFormEmitterData,
        handleEmitterChange,
        sendEmitterTransaction,
        emitterTransactions,
      }}
    >
      {children}
    </EmitterContext.Provider>
  );
};
