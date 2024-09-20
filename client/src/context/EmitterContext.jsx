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
  const [isLoadingEmitter, setIsLoadingEmitter] = useState(false);
  const [currentEmitterAccount, setCurrentEmitterAccount] = useState("");

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
  const getContract = async () => {
    const contract = await getEthereumContract(
      contractAddress,
      contractABI,
      { ethereum }
    );
    return contract;
  };
  const getEmitterCount = async () => {
    const contract = await getContract();
    const count = await contract.getTransactionCount();
    return count;
  }
  const sendEmitterTransaction = async (formData) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentAccount = accounts[0];
      const { project_name,credit_amount, date_bought, verification_status, prev_tx } = formData;
      const emitterContract = await getContract();
      const parsedAmount = Math.floor(Number(credit_amount));
      const dateBoughtInSeconds = Math.floor(new Date(date_bought).getTime() / 1000);

      const emitterData = {
        credit_amount: parsedAmount,
        project_name: project_name,
        end_date: dateBoughtInSeconds,
        status: verification_status,
        prev_tx: prev_tx,
      }
      console.log("Data at EmitterContext:", emitterData);
      
      const transactionHash = await emitterContract.addToBlockChain(
        emitterData,
        { from: currentAccount, gas: "0x5208", }
      );

      setIsLoadingEmitter(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoadingEmitter(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await emitterContract.getTransactionCount();
      const formattedDateBought = convertDateFormat(dateBoughtInSeconds);


      if (verification_status === "0") {
      const response = await axios.post('http://localhost:3000/emitter/create', {
        emitterAddress: currentAccount,
        project_name: project_name,
        credit_amount: credit_amount,
        date_bought: formattedDateBought,
        verification_status: verification_status,
        transaction_hash: transactionHash.hash,
        prev_tx: prev_tx
      });
      console.log('Data created:', response.data);
    }
    else {
      const response = await axios.put(`http://localhost:3000/emitter/update/${formData.transaction_hash}`, {
        emitterAddress: currentAccount,
        project_name: project_name,
        credit_amount: credit_amount,
        date_bought: formattedDateBought,
        verification_status: verification_status,
        prev_tx: formData.transaction_hash,
        transaction_hash: transactionHash.hash
      });
      console.log('Data updated:', response.data);
    }
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
        sendEmitterTransaction,
        getEmitterCount,
      }}
    >
      {children}
    </EmitterContext.Provider>
  );
};
