import React, { useEffect, useState } from "react";
import {
  contractABI,
  contractAddress
} from "../utils/Emitter/EmitterConstants";
import { getEthereumContract } from "./GlobalFunctions/getEthereumContract";
import axios from "axios";
import { convertDateFormat } from "../scripts/handleDateFormat";

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
    date_bought: 0,
    verification_status: "",
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

  const connectEmitterWallet = async (account) => {
    setCurrentEmitterAccount(account);
  };

  const sendEmitterTransaction = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentAccount = accounts[0];
      const { credit_amount, date_bought, verification_status } = formEmitterData;
      console.log(credit_amount, date_bought, verification_status);
      const emitterContract = await getEthereumContract(
        contractAddress,
        contractABI,
        { ethereum }
      );
      const parsedAmount = Math.floor(Number(credit_amount));

      const transactionHash = await emitterContract.addToBlockChain(
        parsedAmount,
        verification_status,
        date_bought,
        { from: currentAccount, gas: "0x5208", }
      );

      setIsLoadingEmitter(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoadingEmitter(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await emitterContract.getTransactionCount();
      setEmitterTransactionCount(transactionCount.toNumber);
      const formattedDateBought = convertDateFormat(date_bought);
      const response = await axios.post('http://localhost:3000/emitter/create', {
        emitterAddress: currentAccount,
        credit_amount: credit_amount,
        date_bought: formattedDateBought,
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
