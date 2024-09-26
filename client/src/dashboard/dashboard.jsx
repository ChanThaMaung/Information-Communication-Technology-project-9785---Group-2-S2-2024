import React, { useContext, useState, useEffect } from "react";
import { IssuerContext } from "../context/IssuerContext";
import { EmitterContext } from "../context/EmitterContext";
import { VerifierContext } from "../context/VerifierContext";

import Navbar from "../components/Navbar/Navbar";
import DashboardNavbar from "../components/Navbar/DashboardNavbar";

import { formatDate } from "../scripts/handleDateFormat";
import IssuerDashboard from "./issuerDashboard";
import EmitterDashboard from "./emitterDashboard";
import GuestDashboard from "./guestDashboard";

import VerifierDashboard from "./verifier_dashboard/verifierDashboard";
import * as issuerAPI from "../../../server/API/Issuer/get_issuer_api"
import * as emitterAPI from "../../../server/API/Emitter/get_emitter_api"
import * as verifierAPI from "../../../server/API/Verifier/get_verifier_api"

console.log("Dashboard rendering");

function Dashboard() {
  //   console.log("Dashboard rendering");
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountType, setAccountType] = useState("");
  const [allTransactions, setAllTransactions] = useState([]);

  const [totalUniqueEmitter, setTotalUniqueEmitter] = useState(0);
  const [totalUniqueIssuer, setTotalUniqueIssuer] = useState(0);
  const [totalUniqueVerifier, setTotalUniqueVerifier] = useState(0);

  const [totalEmitterTransactions, setTotalEmitterTransactions] = useState(0);
  const [totalIssuerTransactions, setTotalIssuerTransactions] = useState(0);
  const [totalVerifierTransactions, setTotalVerifierTransactions] = useState(0);

  const [totalCreditsRetired, setTotalCreditsRetired] = useState(0);
  const [totalCreditsIssued, setTotalCreditsIssued] = useState(0);
  // const [isWalletChecked, setIsWalletChecked] = useState(false);

  const [activeRows, setActiveRows] = useState([]);
  const [retiredRows, setRetiredRows] = useState([]);

  const [totalVerifiedCreditsIssued, setTotalVerifiedCreditsIssued] = useState(0);
  const [totalVerifiedCreditsBought, setTotalVerifiedCreditsBought] = useState(0);
  const [totalVerifiedEmitter, setTotalVerifiedEmitter] = useState(0);
  const [totalVerifiedIssuer, setTotalVerifiedIssuer] = useState(0);
  const [totalTransactionCount, setTotalTransactionCount] = useState(0);


  const {
    connectIssuerWallet,
    currentIssuerAccount,
    sendIssuerTransaction,

  } = useContext(IssuerContext);

  const {
    connectEmitterWallet,
    currentEmitterAccount,
    sendEmitterTransaction,
  } = useContext(EmitterContext);

  const {
    connectVerifierWallet,
    currentVerifierAccount,
    sendVerifierTransaction,
  } = useContext(VerifierContext);

  const issuerAcc = "0xf8E848eDC950D1455481e7D82a80098f35D2dCE6";
  const verifierAcc = "0xed1626e677Ad1ad8dA0Cb707CD4a32A604AB0862";
  const emitterAcc = "0x21B4B54911cFA548C153daA6605161cBAa1eb878";

  useEffect(() => {

    getUserCount();
    getTransactionCount();
    getCredits();
    getActiveRows();
    getRetiredRows();
    getTotalVerified();
    getVerifiedCredits();
  }, [currentAccount]);

  const getTotalVerified = async () => {
    const verifiedIssuerCount = await issuerAPI.getVerifiedIssuer();
    const verifiedEmitterCount = await emitterAPI.getVerifiedEmitter();
    setTotalVerifiedIssuer(verifiedIssuerCount[0].verified_count);
    setTotalVerifiedEmitter(verifiedEmitterCount[0].verified_count);
  }

  const getVerifiedCredits = async () => {
    const verifiedCreditsIssued = await issuerAPI.getVerifiedIssuerCount();
    const verifiedCreditsBought = await emitterAPI.getVerifiedEmitterCount();
    setTotalVerifiedCreditsIssued(verifiedCreditsIssued[0].verified_credits);
    setTotalVerifiedCreditsBought(verifiedCreditsBought[0].verified_credits);
  }
  const getUserCount = async () => {
    const emitterCount = await emitterAPI.getUniqueEmitter();
    const issuerCount = await issuerAPI.getUniqueIssuer();
    const verifierCount = await verifierAPI.getUniqueVerifier();

    setTotalUniqueEmitter(emitterCount[0].address_count);
    setTotalUniqueIssuer(issuerCount[0].address_count);
    setTotalUniqueVerifier(verifierCount[0].address_count);
  }
  const getTransactionCount = async () => {
    const emitterCount = await emitterAPI.getCountEmitter();
    const issuerCount = await issuerAPI.getCountIssuer();
    const verifierCount = await verifierAPI.getCountVerifier();
    setTotalEmitterTransactions(emitterCount[0].transaction_count);
    setTotalIssuerTransactions(issuerCount[0].transaction_count);
    setTotalVerifierTransactions(verifierCount[0].transaction_count);
    setTotalTransactionCount(emitterCount[0].transaction_count + issuerCount[0].transaction_count);
  }

  const getCredits = async () => {
    const creditsRetired = await issuerAPI.getRetiredCredits();
    const creditsIssued = await issuerAPI.getActiveCredits();

    setTotalCreditsRetired(creditsRetired[0].credit_retired);
    setTotalCreditsIssued(creditsIssued[0].credit_issued);
  }

  const getActiveRows = async () => {
    const activeRows = await issuerAPI.getActiveRows();
    setActiveRows(activeRows);
  }

  const getRetiredRows = async () => {
    const retiredRows = await issuerAPI.getRetiredRows();
    setRetiredRows(retiredRows);
  }

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
    }
  };

  const determineAccountType = async (account) => {
    let accountType = "";

    if (account.toLowerCase() === issuerAcc.toLowerCase()) {
      accountType = "issuer";
      setAccountType(accountType);
      connectIssuerWallet(account);
      setAllTransactions(await issuerAPI.getAllIssuer())

    } else if (account.toLowerCase() === verifierAcc.toLowerCase()) {

      accountType = "verifier";
      setAccountType(accountType);
      connectVerifierWallet(account);
      setAllTransactions(await verifierAPI.getAllVerifier())

    } else if (account.toLowerCase() === emitterAcc.toLowerCase()) {
      accountType = "emitter";
      setAccountType(accountType);
      connectEmitterWallet(account);
      setAllTransactions(await emitterAPI.getAllEmitter())

    } else {
      accountType = "Guest";
      setAccountType(accountType);
    }
  };

  const handleSubmit = async (formData) => {
    if (accountType === "issuer") {
      if (formData.project_name === "") {
        console.log("Project name is required");
        return;
      }
      try {
        console.log("Sending transaction");
        await sendIssuerTransaction(formData);
        console.log("Transaction sent");
        // Optionally, refresh the transactions list
        setAllTransactions(await issuerAPI.getAllIssuer())
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (accountType === "verifier") {
      try {
        let transactionType;

        if (formData.date_bought) {
          transactionType = 0;
          console.log("Type:", transactionType);
          console.log("Sending transaction to emitter");
          await sendEmitterTransaction(formData);
          console.log("Transaction sent - emitter");
        } else if (formData.date_issued) {
          transactionType = 1;
          console.log("Type:", transactionType);
          console.log("Sending transaction to issuer");
          await sendIssuerTransaction(formData);
          console.log("Transaction sent - issuer");
        }

        console.log("Sending transaction to verifier");
        await sendVerifierTransaction(formData, transactionType);
        console.log("Transaction sent - verifier");

      } catch (error) {
        console.error("Error:", error);
      }
    } else if (accountType === "emitter") {
      try {
        console.log("Sending transaction");
        await sendEmitterTransaction(formData);
        console.log("Transaction sent");
        // Optionally, refresh the transactions list
        setAllTransactions(await emitterAPI.getAllEmitter())
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Unknown account type");
    }
  };

  const renderContent = () => {

    switch (accountType) {
      case "issuer":
        return (
          <IssuerDashboard
            handleSubmit={handleSubmit}
            allTransactions={allTransactions}
            formatDate={formatDate}
            currentIssuerAccount={currentIssuerAccount}
          />
        );

      case "verifier":
        return (
          <VerifierDashboard
            handleSubmit={handleSubmit}
            formatDate={formatDate}
            currentVerifierAccount={currentVerifierAccount}
            totalVerifiedCreditsBought={totalVerifiedCreditsBought}
            totalVerifiedCreditsIssued={totalVerifiedCreditsIssued}
          />
        );
      case "emitter":
        return (
          <EmitterDashboard
            handleSubmit={handleSubmit}
            allTransactions={allTransactions}
            formatDate={formatDate}
            currentEmitterAccount={currentEmitterAccount}
          />
        );
      default:
        return (
          <>
            <GuestDashboard
              totalUniqueEmitter={totalUniqueEmitter}
              totalUniqueIssuer={totalUniqueIssuer}
              totalUniqueVerifier={totalUniqueVerifier}
              totalIssuerCount={totalIssuerTransactions}
              totalEmitterCount={totalEmitterTransactions}
              totalVerifierCount={totalVerifierTransactions}
              activeRows={activeRows}
              retiredRows={retiredRows}
              allTransactions={allTransactions}
            />
          </>
        )
    }
  };
  return <>

    <DashboardNavbar onConnect={determineAccountType} />
    <Navbar />
    {renderContent()}
  </>;
}

export default Dashboard;
