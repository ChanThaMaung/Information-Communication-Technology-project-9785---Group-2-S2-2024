// import React, { useContext, useState, useEffect } from "react";
// import { IssuerContext } from "../context/IssuerContext";
// import { EmitterContext } from "../context/EmitterContext";
// import { VerifierContext } from "../context/VerifierContext";

// import { connectWallet as connectWalletFunction } from "../context/GlobalFunctions/connectWallet";
// import axios from "axios";
// import { formatDate } from "../scripts/handleDateFormat";

// import IssuerDashboard from "../dashboard/issuerDashboard";
// import EmitterDashboard from "../dashboard/emitterDashboard";
// import VerifierDashboard from "../dashboard/verifierDashboard";

// function InputPage() {
//   console.log("InputPage rendering");
//   return (
//     <div>
//       <h1>InputPage</h1>
//     </div>
//   )
//   // const [currentAccount, setCurrentAccount] = useState("");
//   // const [accountType, setAccountType] = useState("");
//   // const [allTransactions, setAllTransactions] = useState([]);
//   // const [emitterTransactions, setEmitterTransactions] = useState([]);
//   // const [issuerTransactions, setIssuerTransactions] = useState([]);
//   // // const [isWalletChecked, setIsWalletChecked] = useState(false);

//   // const {
//   //   connectIssuerWallet,
//   //   currentIssuerAccount,
//   //   sendIssuerTransaction,
//   //   issuerTransactionCount
//   // } = useContext(IssuerContext);

//   // const {
//   //   connectEmitterWallet,
//   //   currentEmitterAccount,
//   //   sendEmitterTransaction,
//   //   emitterTransactionCount
//   // } = useContext(EmitterContext);

//   // const {
//   //   connectVerifierWallet,
//   //   currentVerifierAccount,
//   //   sendVerifierTransaction,
//   //   verifierTransactionCount
//   // } = useContext(VerifierContext);

//   // const issuerAcc = "0xf8E848eDC950D1455481e7D82a80098f35D2dCE6";
//   // const verifierAcc = "0xed1626e677Ad1ad8dA0Cb707CD4a32A604AB0862";
//   // const emitterAcc = "0x21B4B54911cFA548C153daA6605161cBAa1eb878";

//   // useEffect(() => {
//   //   // Listen for account changes
//   //   if (window.ethereum) {
//   //     window.ethereum.on("accountsChanged", handleAccountsChanged);
//   //   }

//   //   return () => {
//   //     if (window.ethereum) {
//   //       window.ethereum.removeListener(
//   //         "accountsChanged",
//   //         handleAccountsChanged
//   //       );
//   //     }
//   //   };
//   // }, []);

//   // useEffect(() => {
//   //   determineAccountType();
//   // }, [currentAccount]);

//   // const handleAccountsChanged = async (accounts) => {
//   //   if (accounts.length === 0) {
//   //     // MetaMask is locked or the user has not connected any accounts
//   //     console.log("Please connect to MetaMask.");
//   //   } else if (accounts[0] !== currentAccount) {
//   //     setCurrentAccount(accounts[0]);
//   //   }
//   // };

//   // const handleConnectWallet = async () => {
//   //   try {
//   //     const account = await connectWalletFunction();
//   //     if (account) {
//   //       setCurrentAccount(account);
//   //     }
//   //   } catch (error) {
//   //     console.error("Failed to connect wallet:", error);
//   //   }
//   // };
//   // const retrieveData = async (accountType) => {
//   //   let response, emitterRes, issuerRes, verifierRes;
//   //   if (accountType === "issuer") {
//   //     response = await axios.get("http://localhost:3000/issuer/all");
//   //     console.log("Issuer");
//   //   } else if (accountType === "verifier") {
//   //     response = await axios.get("http://localhost:3000/verifier/all");
//   //     issuerRes = await axios.get("http://localhost:3000/issuer/unverified");
//   //     emitterRes = await axios.get("http://localhost:3000/emitter/unverified");
//   //     console.log("V");
//   //   } else if (accountType === "emitter") {
//   //     response = await axios.get("http://localhost:3000/emitter/all");
//   //     console.log("E");
//   //   }
//   //   return {response, issuerRes, emitterRes, verifierRes};
//   // };
//   // const determineAccountType = () => {
//   //   let accountType = "";
//   //   if (currentAccount.toLowerCase() === issuerAcc.toLowerCase()) {
//   //     accountType = "issuer";
//   //     setAccountType(accountType);
//   //     connectIssuerWallet(currentAccount);
//   //     retrieveData(accountType)
//   //       .then((response) => {
//   //         setAllTransactions(response.response.data);
//   //       })
//   //       .catch((error) => {
//   //         console.error("Error:", error);
//   //       });
//   //   } else if (currentAccount.toLowerCase() === verifierAcc.toLowerCase()) {
//   //     accountType = "verifier";
//   //     setAccountType(accountType);
//   //     connectVerifierWallet(currentAccount);
//   //     retrieveData(accountType)
//   //       .then((response) => {
//   //         setAllTransactions(response.response.data);
//   //         setEmitterTransactions(response.emitterRes.data);
//   //         setIssuerTransactions(response.issuerRes.data);
//   //       })
//   //       .catch((error) => {
//   //         console.error("Error:", error);
//   //       });
//   //   } else if (currentAccount.toLowerCase() === emitterAcc.toLowerCase()) {
//   //     accountType = "emitter";
//   //     setAccountType(accountType);
//   //     connectEmitterWallet(currentAccount);
//   //     retrieveData(accountType)
//   //       .then((response) => {
//   //         setAllTransactions(response.response.data);
//   //       })
//   //       .catch((error) => {
//   //         console.error("Error:", error);
//   //       });
//   //   } else {
//   //     accountType = "Guest";
//   //     setAccountType(accountType);
//   //   }
//   // };

//   // const handleSubmit = async (formData) => {

//   //   if (accountType === "issuer") {    
//   //     if (formData.project_name === "") {
//   //       console.log("Project name is required");
//   //       return;
//   //     }
//   //     try {
//   //       console.log("Sending transaction");
//   //       await sendIssuerTransaction(formData);
//   //       console.log("Transaction sent");
//   //       // Optionally, refresh the transactions list
//   //       const updatedTransactions = await retrieveData("issuer");
//   //       setAllTransactions(updatedTransactions.response.data);
//   //     } catch (error) {
//   //       console.error("Error:", error);
//   //     }
//   //   } else if (accountType === "verifier") {

//   //       try {
//   //        console.log("Sending transaction");
//   //        await sendVerifierTransaction(formData);
//   //        console.log("Transaction sent");
         
//   //        if (formData.date_bought) {
//   //         console.log("Sending transaction to emitter");
//   //         await sendEmitterTransaction(formData);
//   //         console.log("Transaction sent - emitter");
//   //        }
//   //        else if (formData.date_issued) {
//   //         console.log("Sending transaction to issuer");
//   //         await sendIssuerTransaction(formData);
//   //         console.log("Transaction sent - issuer");
//   //        }
//   //        // Optionally, refresh the transactions list
         
//   //       } catch (error) {
//   //         console.error("Error:", error);
//   //       }
//   //   } else if (accountType === "emitter") {

//   //     try {
//   //       console.log("Sending transaction");
//   //       await sendEmitterTransaction(formData);
//   //       console.log("Transaction sent");
//   //       // Optionally, refresh the transactions list
//   //       const updatedTransactions = await retrieveData("emitter");
//   //       setAllTransactions(updatedTransactions.response.data);
//   //     } catch (error) {
//   //       console.error("Error:", error);
//   //     }
//   //   } else {
//   //     console.log("Unknown account type");
//   //   }
//   // };

//   // const renderContent = () => {
    
//   //   if (!currentAccount) {
//   //     return (
//   //       <button
//   //         onClick={handleConnectWallet}
//   //         className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32"
//   //       >
//   //         Connect
//   //       </button>
//   //     );
//   //   }
//   //   switch (accountType) {
//   //     case "issuer":
//   //       return (
//   //         <IssuerDashboard
//   //           handleSubmit={handleSubmit}
//   //           allTransactions={allTransactions}
//   //           formatDate={formatDate}
//   //           currentIssuerAccount={currentIssuerAccount}
//   //         />
//   //       );

//   //     case "verifier":
//   //       return (
//   //         <VerifierDashboard
//   //           handleSubmit={handleSubmit}
//   //           emitterTransactions={emitterTransactions}
//   //           issuerTransactions={issuerTransactions}
//   //           allTransactions={allTransactions}
//   //           formatDate={formatDate}
//   //           currentVerifierAccount={currentVerifierAccount}
//   //         />
//   //       )
//   //     case "emitter":
//   //       return (
//   //         <EmitterDashboard
//   //           handleSubmit={handleSubmit}
//   //           allTransactions={allTransactions}
//   //           formatDate={formatDate}
//   //           currentEmitterAccount={currentEmitterAccount}
//   //         />
//   //       );
//   //     default:
//   //       return <p>Unknown account type</p>;
//   //   }
//   // };
//   // return <>{renderContent()}</>;
// }

// export default InputPage;
