import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/Issuer/IssuerConstants";
import { getEthereumContract } from "./GlobalFunctions/getEthereumContract";
import axios from "axios";
import { convertDateFormat } from "../scripts/handleDateFormat";

export const IssuerContext = React.createContext();

const { ethereum } = window;

export const IssuerProvider = ({ children }) => {
  const [isLoadingIssuer, setIsLoadingIssuer] = useState(false);
  const [currentIssuerAccount, setCurrentIssuerAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
  };


  const connectIssuerWallet = async (account) => {
    setCurrentIssuerAccount(account);
  }
  const getContract = async () => {
    const contract = await getEthereumContract(
      contractAddress,
      contractABI,
      { ethereum }
    );
    return contract;
  }
  
  const getIssuerCount = async () => {
    const contract = await getContract();
    const count = await contract.getTransactionCount();
    return count;
  }
  const sendIssuerTransaction = async (formData) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentAccount = accounts[0];

      const { project_name, credit_amount, active_status, date_issued, period_covered, verification_status, prev_tx } = formData;
      const string_status = active_status.toString();
      const issuedDateInSeconds = Math.floor(new Date(date_issued).getTime() / 1000);
      console.log('Form Data:', {
        'Project Name': project_name,
        'Amount': credit_amount,
        'Status': string_status,
        'Issued Date': issuedDateInSeconds,
        'Period Covered': period_covered,
        'Verification Status': verification_status,
        'Previous Transaction': prev_tx 
      });
      const issuerContract = await getContract();
      const parsedAmount = Math.floor(Number(credit_amount));

      const issueData = {
        credit_amount: parsedAmount,
        project_name: project_name,
        active_status: string_status,
        date_covered: period_covered,
        date_issued: issuedDateInSeconds,
        verification_status: verification_status,
        prev_tx: prev_tx,
      }

      console.log(verification_status);
      console.log(formData.transaction_hash);

      const transactionHash = await issuerContract.addToBlockChain(
        issueData,
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

      // const issuerTransactionCount = await issuerContract.getTransactionCount();
      if (verification_status === "0") {
      const response = await axios.post('http://localhost:3000/issuer/create', {
        issuer_address: currentAccount,
        project_name: project_name,
        credit_amount: parsedAmount,
        active_status: string_status,
        date_issued: formattedIssuedDate,
        period_covered: period_covered,
        verification_status: verification_status,
        prev_tx: prev_tx,
        transaction_hash: transactionHash.hash
      });
      console.log('Data created:', response.data);
    }
    else if (verification_status === "1") {
      const response = await axios.put(`http://localhost:3000/issuer/update/${formData.transaction_hash}`, {
        project_name: project_name,
        credit_amount: parsedAmount,
        active_status: string_status,
        date_issued: formattedIssuedDate,
        period_covered: period_covered,
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
    <IssuerContext.Provider
      value={{
        connectIssuerWallet,
        currentIssuerAccount,
        sendIssuerTransaction,
        getIssuerCount,
      }}
    >
      {children}
    </IssuerContext.Provider>
  );
};
