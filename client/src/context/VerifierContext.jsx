import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/Verifier/VerifierConstants";
import { getEthereumContract } from "./GlobalFunctions/getEthereumContract";
import axios from "axios";
import { convertDateFormat } from "../scripts/handleDateFormat";

export const VerifierContext = React.createContext();

const { ethereum } = window;

export const VerifierProvider = ({ children }) => {
  const [isLoadingVerifier, setIsLoadingVerifier] = useState(false);
  const [currentVerifierAccount, setCurrentVerifierAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please install Metamask");
    await ethereum.request({ method: "eth_accounts" });
  };

  const connectVerifierWallet = async (account) => {
    setCurrentVerifierAccount(account);
    return currentVerifierAccount;
  };

  const getContract = async () => {
    const contract = await getEthereumContract(
      contractAddress,
      contractABI,
      { ethereum }
    );
    return contract;
  }
  
  const sendVerifierTransaction = async (formData) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentAccount = accounts[0];
      const {transaction_hash} = formData; 
      const verifierContract = await getContract();
      const transactionHash = await verifierContract.addToBlockChain(
        transaction_hash,
        {
          from: currentAccount,
          gas: "0x5208",
        }
      );
      console.log(`Loading: ${transactionHash.hash}`);
      const currentDate = new Date().toLocaleDateString('en-GB');
      await transactionHash.wait();
      console.log(`Success: ${transactionHash.hash}`);
      

      const response = await axios.post('http://localhost:3000/verifier/create', {  
        verifier_address: currentAccount,
        project_name: formData.project_name,
        verification_date: currentDate,
        transaction_updated: transaction_hash,
        transaction_hash: transactionHash.hash
      });
      
      console.log('Data created:', response.data);
      return transactionHash.hash;
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <VerifierContext.Provider value={{
      currentVerifierAccount,
      connectVerifierWallet,
      sendVerifierTransaction,

    }}>
      {children}    
    </VerifierContext.Provider>
  );
};  