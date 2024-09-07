import React, { useContext, useState, useEffect } from "react";
import { IssuerContext } from "../context/IssuerContext";
import { EmitterContext } from "../context/EmitterContext";
import { connectWallet as connectWalletFunction } from "../context/GlobalFunctions/connectWallet";

function InputPage() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountType, setAccountType] = useState("");

  const {
    connectIssuerWallet,
    currentIssuerAccount,
    formIssuerData,
    sendIssuerTransaction,
    handleChangeIssuer,
    issuerTransactions,
  } = useContext(IssuerContext);
  
  const {
    connectEmitterWallet,
    currentEmitterAccount,
    formEmitterData,
    sendEmitterTransaction,
    handleEmitterChange,
    emitterTransactions,
  } = useContext(EmitterContext);

  const issuerAcc = "0xf8E848eDC950D1455481e7D82a80098f35D2dCE6";
  const verifierAcc = "0xed1626e677Ad1ad8dA0Cb707CD4a32A604AB0862";
  const emitterAcc = "0x21B4B54911cFA548C153daA6605161cBAa1eb878";

  useEffect(() => {
    const checkWalletConnection = async () => {
      const account = await connectWalletFunction();
      if (account) {
        setCurrentAccount(account);
      }
    };

    checkWalletConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  useEffect(() => {
    determineAccountType();
  }, [currentAccount]);

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
    }
  };

  const handleConnectWallet = async () => {
    try {
      const account = await connectWalletFunction();
      if (account) {
        setCurrentAccount(account);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const determineAccountType = () => {
    if (currentAccount.toLowerCase() === issuerAcc.toLowerCase()) {
      setAccountType("issuer");
      connectIssuerWallet(currentAccount);
    } else if (currentAccount.toLowerCase() === verifierAcc.toLowerCase()) {
      setAccountType("verifier");
    } else if (currentAccount.toLowerCase() === emitterAcc.toLowerCase()) {
      setAccountType("emitter");
      connectEmitterWallet(currentAccount);
    } else {
      setAccountType("");
    }
  };

  const handleEndDateChange = (e) => {
    const date = new Date(e.target.value);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    if (accountType === "issuer") {
      handleChangeIssuer(
        { target: { name: "end_date", value: unixTimestamp } },
        "end_date"
      );
    } else if (accountType === "emitter") {
      handleEmitterChange(
        { target: { name: "end_date", value: unixTimestamp } },
        "end_date"
      );
    }
  };

  function formatDate( unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString(); // Returns a string with a language-sensitive representation of the date
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (accountType === "issuer") {
      const { amount, end_date, status } = formIssuerData;
      if (!amount || !end_date || !status) return;
      await sendIssuerTransaction();
    } else if (accountType === "verifier") {
      console.log("Verifier functionality not implemented yet");
    } else if (accountType === "emitter") {
      const { credit_amount, end_date, status } = formEmitterData;
      if (!credit_amount || !end_date || !status) return;
      await sendEmitterTransaction();
    } else {
      console.log("Unknown account type");
    }
  };

  const renderContent = () => {
    if (!currentAccount) {
      return (
        <button
          onClick={handleConnectWallet}
          className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32"
        >
          Connect
        </button>
      );
    }

    switch (accountType) {
      case "issuer":
        return (
          <>
            <div className="flex justify-center items-center">
              <h2 className="text-2xl font-bold">Issuer Dashboard</h2>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <span className="mr-2 w-32">Carbon Credit:</span>
                <input
                  name="amount"
                  type="number"
                  onChange={(e) => handleChangeIssuer(e, "amount")}
                  className="form-control border border-black p-2 ml-2"
                />
              </div>

              <div className="flex items-center">
                <span className="mr-2 w-32">Expected Retirement Date:</span>
                <input
                  name="end_date"
                  type="date"
                  onChange={handleEndDateChange}
                  className="form-control border border-black p-2 ml-2"
                />
              </div>

              <div className="flex items-center">
                <span className="mr-2 w-32">Status:</span>
                <select
                  name="status"
                  onChange={(e) => handleChangeIssuer(e, "status")}
                  className="form-control border border-black p-2 ml-2"
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32"
              >
                Submit
              </button>
            </div>
            <div>{currentIssuerAccount ? <p>Address: {currentIssuerAccount}</p> : null}</div>
            <div>
              <h1>Transactions</h1>
              {/* {currentIssuerAccount && <h2>Address: {currentIssuerAccount}</h2>} */}
              <ul>
                {issuerTransactions.map((tx, index) => (
                  <li key={index}>
                    Amount: {tx[1].toString()}, Timestamp: {formatDate(Number(tx[2]))}, End
                    Date: {formatDate(Number(tx[4]))}, Status: {tx[3].toString()}
                  </li>
                ))}
              </ul>
            </div>
          </>
        );
      case "verifier":
        return (
          <>
            <div className="flex justify-center items-center">
              <h2 className="text-2xl font-bold">Verifier Dashboard</h2>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <span className="mr-2 w-32">Carbon Credit:</span>
                  <input
                    name="amount"
                    type="number"
                    onChange={(e) => handleChangeIssuer(e, "amount")}
                    className="form-control border border-black p-2 ml-2"
                  />
                </div>

                <div className="flex items-center">
                  <span className="mr-2 w-32">Date of Purchase:</span>
                  <input
                    name="end_date"
                    type="date"
                    onChange={handleEndDateChange}
                    className="form-control border border-black p-2 ml-2"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32"
                >
                  Submit
                </button>
              </div>
            </div>
          </>
        );
      case "emitter":
        return (
          <>
            <div className="flex justify-center items-center">
              <h2 className="text-2xl font-bold"> Emitter Dashboard</h2>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <span className="mr-2 w-32">Carbon Credit:</span>
                <input
                  name="credit_amount"
                  type="number"
                  onChange={(e) => handleEmitterChange(e, "credit_amount")}
                  className="form-control border border-black p-2 ml-2"
                />
              </div>

              <div className="flex items-center">
                <span className="mr-2 w-32">Expected Retirement Date:</span>
                <input
                  name="end_date"
                  type="date"
                  onChange={handleEndDateChange}
                  className="form-control border border-black p-2 ml-2"
                />
              </div>

              <div className="flex items-center">
                <span className="mr-2 w-32">Status:</span>
                <select
                  name="status"
                  onChange={(e) => handleEmitterChange(e, "status")}
                  className="form-control border border-black p-2 ml-2"
                >
                  <option value="">Select Status</option>
                  <option value="Verified">Verified</option>
                  <option value="Unverified">Unverified</option>
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32"
              >
                Submit
              </button>
            </div>
            <div>{currentEmitterAccount ? <p>Address: {currentEmitterAccount}</p> : null}</div>
            <div>
              <h1>Transactions</h1>
              <ul>
                {emitterTransactions.map((tx, index) => (
                  <li key={index}>
                    Amount: {tx[1].toString()}, Timestamp: {formatDate(Number(tx[2]))}, End
                    Date: {formatDate(Number(tx[4]))}, Status: {tx[3].toString()}
                  </li>
                ))}
              </ul>
            </div>
          </>
        );
      default:
        return <p>Unknown account type</p>;
    }
  };

  return (
    <>
      {renderContent()}
    </>
  );
}

export default InputPage;
