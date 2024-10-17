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
import * as transactionsAPI from "../../../server/API/get_all_transactions"
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
  }, [currentAccount]);

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
    setTotalTransactionCount(emitterCount[0].transaction_count + issuerCount[0].transaction_count + verifierCount[0].transaction_count);
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

  const determineAccountType = async (account) => {
    let accountType = "";

    if (account.toLowerCase() === issuerAcc.toLowerCase()) {
      accountType = "issuer";
      setAccountType(accountType);
      connectIssuerWallet(account);
      setCurrentAccount(account);
      // setAllTransactions(await issuerAPI.getAllIssuer())

    } else if (account.toLowerCase() === verifierAcc.toLowerCase()) {

      accountType = "verifier";
      setAccountType(accountType);
      connectVerifierWallet(account);
      setCurrentAccount(account);
      // setAllTransactions(await verifierAPI.getAllVerifier())

    } else if (account.toLowerCase() === emitterAcc.toLowerCase()) {
      accountType = "emitter";
      setAccountType(accountType);
      connectEmitterWallet(account);
      setCurrentAccount(account);
      // setAllTransactions(await emitterAPI.getAllEmitter())

    } else {
      accountType = "Guest";
      setAccountType(accountType);
    }
  };

  const handleSubmit = async (formData) => {
    let transactionHash = "";
    let data = {};
    if (accountType === "issuer") {
      if (!formData.project_name) {
        alert("Project name is required!");
        return;
      }
      if (!formData.credit_amount) {
        alert("Credit amount is required!");
        return;
      }

      if (!formData.date_issued) {
        alert("Date issued is required!");
        return;
      }
      if (!formData.active_status) {
        alert("Active Status is Required!");
        return;
      }

      if (!formData.country) {
        alert("Country is required!");
        return;
      }

      if (!formData.period_covered) {
        alert("Period covered is required!");
        return;
      }

      try {
        console.log("Sending transaction");
        transactionHash = await sendIssuerTransaction(formData, "issuer");
        console.log("Transaction sent");
        // Optionally, refresh the transactions list
        setAllTransactions(await issuerAPI.getAllIssuer())
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (accountType === "verifier") {
      try {

        console.log("Sending transaction to issuer");
        await sendIssuerTransaction(formData, "verifier");
        console.log("Transaction sent - issuer");

        console.log("Sending transaction to verifier");
        transactionHash = await sendVerifierTransaction(formData);
        console.log("Transaction sent - verifier");
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (accountType === "emitter") {
      try {

        console.log("Sending transaction to Issuer");
        formData.active_status = 1;
        await sendIssuerTransaction(formData, "emitter");
        console.log("Transaction sent - issuer");

        console.log("Sending transaction");
        transactionHash = await sendEmitterTransaction(formData);
        console.log("Transaction sent");
        // Optionally, refresh the transactions list
        setAllTransactions(await emitterAPI.getAllEmitter())
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Unknown account type");
    }
    const currDate = new Date().toLocaleString('en-AU', {
      timeZone: 'Australia/Sydney',
      hour12: false
    }).replace(/(\d+)\/(\d+)\/(\d+),?\s*(\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5:$6');

    data = {
      transaction_hash: transactionHash,
      address: currentAccount,
      date_added: currDate,
      type: accountType
    }
    console.log(data);
    if (transactionHash) await transactionsAPI.addTransaction(data);
    else console.log("No transaction hash");
  };

  const renderContent = () => {

    switch (accountType) {
      case "issuer":
        return (
          <IssuerDashboard
            handleSubmit={handleSubmit}
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
          />
        );
      case "emitter":
        return (
          <EmitterDashboard
            handleSubmit={handleSubmit}
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
              totalTransactionCount={totalTransactionCount}
            />
          </>
        )
    }
  };
  return <>

    <DashboardNavbar onConnect={determineAccountType} />
    <Navbar type={accountType} />
    {renderContent()}
  </>;
}

export default Dashboard;
