import React, { useEffect, useState } from "react";
import {
  contractABI,
  contractAddress
} from "../utils/Emitter/EmitterConstants";
import { getEthereumContract } from "./GlobalFunctions/getEthereumContract";
import axios from "axios";
import { convertDateTimeFormat } from "../scripts/handleDateFormat";

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
    return currentEmitterAccount;
  };
  const getContract = async () => {
    const contract = await getEthereumContract(
      contractAddress,
      contractABI,
      { ethereum }
    );
    return contract;
  };

  const sendEmitterTransaction = async (formData) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentAccount = accounts[0];
      const { project_name, credit_amount } = formData;
      const emitterContract = await getContract();
      const parsedAmount = Math.floor(Number(credit_amount));
      const currDateInSeconds = Math.floor(new Date().getTime() / 1000);

      const emitterData = {
        credit_amount: parsedAmount,
        project_name: project_name,
        date_bought: currDateInSeconds
      }

      console.log("Data at EmitterContext:", emitterData);

      const transactionHash = await emitterContract.addToBlockChain(
        emitterData, { from: currentAccount }
      );

      setIsLoadingEmitter(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoadingEmitter(false);
      console.log(`Success - ${transactionHash.hash}`);

      const formattedDateBought = convertDateTimeFormat(currDateInSeconds);

      const response = await axios.post('http://localhost:3000/emitter/create', {
        emitter_address: currentAccount,
        project_name: project_name,
        credit_amount: credit_amount,
        date_bought: formattedDateBought,
        transaction_hash: transactionHash.hash,
      });

      console.log('Data created:', response.data);
      return transactionHash.hash;
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
      }}
    >
      {children}
    </EmitterContext.Provider>
  );
};
