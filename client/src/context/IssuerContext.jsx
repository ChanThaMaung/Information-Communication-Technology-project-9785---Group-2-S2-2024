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
    return currentIssuerAccount;
  }
  const getContract = async () => {
    const contract = await getEthereumContract(
      contractAddress,
      contractABI,
      { ethereum }
    );
    return contract;
  }

  const sendIssuerTransaction = async (formData, type) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentAccount = accounts[0];

      const { issuer_address,
        project_name,
        credit_amount,
        country,
        active_status,
        date_issued,
        period_covered,
        verification_status,
        bought_by,
        prev_tx } = formData;
      const string_status = active_status.toString();
      const issuedDateInSeconds = Math.floor(new Date(date_issued).getTime() / 1000);
      console.log('Form Data:', {
        'Address': issuer_address,
        'Project Name': project_name,
        'Amount': credit_amount,
        'Status': string_status,
        'Issued Date': issuedDateInSeconds,
        'Period Covered': period_covered,
        'Verification Status': verification_status,
        'Previous Transaction': prev_tx,
        'Bought by': bought_by,
        'Country': country
      });
      const issuerContract = await getContract();
      const parsedAmount = Math.floor(Number(credit_amount));

      const issueData = {
        issuer_address: issuer_address,
        credit_amount: parsedAmount,
        project_name: project_name,
        active_status: string_status,
        date_covered: period_covered,
        date_issued: issuedDateInSeconds,
        verification_status: verification_status.toString(),
        prev_tx: prev_tx,
        country: country,
        bought_by: bought_by,
      }

      console.log("Sending transaction to blockchain - DO NOT FORGET TO UNCOMMENT");
      const transactionHash = await issuerContract.addToBlockChain(
        issueData, { from: currentAccount }
      );

      setIsLoadingIssuer(true);
      console.log(`Loading: ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoadingIssuer(false);
      console.log(`Success: ${transactionHash.hash}`);
      const formattedIssuedDate = convertDateFormat(issuedDateInSeconds);
      if (type === "issuer") {
        const response = await axios.post('http://localhost:3000/issuer/create', {
          issuer_address: currentAccount,
          project_name: project_name,
          credit_amount: parsedAmount,
          active_status: active_status,
          country: country,
          date_issued: formattedIssuedDate,
          period_covered: period_covered,
          verification_status: verification_status,
          prev_tx: prev_tx,
          bought_by: bought_by,
          transaction_hash: transactionHash.hash
        });
        console.log('Data created:', response.data);
      }
      else if (type === "verifier") {
        const response = await axios.put(`http://localhost:3000/issuer/update/${formData.transaction_hash}`, {
          project_name: project_name,
          credit_amount: parsedAmount,
          active_status: active_status,
          date_issued: formattedIssuedDate,
          period_covered: period_covered,
          verification_status: 1,
          prev_tx: prev_tx,
          bought_by: bought_by,
          country: country,
          transaction_hash: transactionHash.hash
        });
        console.log('Data updated:', response.data);
      }
      else if (type === "emitter") {
        const response = await axios.put(`http://localhost:3000/issuer/update/${formData.transaction_hash}`, {
          project_name: project_name,
          credit_amount: parsedAmount,
          active_status: 1,
          date_issued: formattedIssuedDate,
          period_covered: period_covered,
          verification_status: verification_status,
          prev_tx: prev_tx,
          bought_by: bought_by,
          country: country,
          transaction_hash: transactionHash.hash
        });
        console.log('Data updated:', response.data);
      }

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
    <IssuerContext.Provider
      value={{
        connectIssuerWallet,
        currentIssuerAccount,
        sendIssuerTransaction,
      }}
    >
      {children}
    </IssuerContext.Provider>
  );
};
