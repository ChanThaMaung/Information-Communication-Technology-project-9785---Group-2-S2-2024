import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constant";

export const IssuerContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const issuerContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  console.log(issuerContract);
  return issuerContract;
};

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
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!window.ethereum) return alert("Please install metamask");
      const { amount, end_date, status } = formData;
      console.log(amount, end_date, status);
      const issuerContract = await getEthereumContract();
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
