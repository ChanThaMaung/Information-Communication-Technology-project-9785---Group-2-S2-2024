import React, { useContext, useState, useEffect } from "react";
import { IssuerContext } from "../context/IssuerContext";
import { EmitterContext } from "../context/EmitterContext";
import { connectWallet as connectWalletFunction } from "../context/GlobalFunctions/connectWallet";
import axios from "axios";
import { formatDate, convertDateFormat } from "../scripts/handleDateFormat";

function InputPage() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountType, setAccountType] = useState("");
  const [allTransactions, setAllTransactions] = useState([]);
  // const [isWalletChecked, setIsWalletChecked] = useState(false);

  const {
    connectIssuerWallet,
    currentIssuerAccount,
    formIssuerData,
    sendIssuerTransaction,
    handleChangeIssuer,
  } = useContext(IssuerContext);

  const {
    connectEmitterWallet,
    currentEmitterAccount,
    formEmitterData,
    sendEmitterTransaction,
    handleEmitterChange,
  } = useContext(EmitterContext);

  const issuerAcc = "0xf8E848eDC950D1455481e7D82a80098f35D2dCE6";
  const verifierAcc = "0xed1626e677Ad1ad8dA0Cb707CD4a32A604AB0862";
  const emitterAcc = "0x21B4B54911cFA548C153daA6605161cBAa1eb878";

  useEffect(() => {
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  useEffect(() => {
    determineAccountType();
  }, [currentAccount]);

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
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

  const retrieveData = async (accountType) => {
    let response;
    if (accountType === "issuer") {
      response = await axios.get("http://localhost:3000/issuer/all");
      console.log("Issuer");
    } else if (accountType === "verifier") {
      response = await axios.get("http://localhost:3000/verifier/all");
      console.log("V");
    } else if (accountType === "emitter") {
      response = await axios.get("http://localhost:3000/emitter/all");
      console.log("E");
    }
    return response;
  };
  const determineAccountType = () => {
    let accountType = "";
    if (currentAccount.toLowerCase() === issuerAcc.toLowerCase()) {
      accountType = "issuer";
      setAccountType(accountType);
      connectIssuerWallet(currentAccount);
      retrieveData(accountType)
        .then((response) => {
          setAllTransactions(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (currentAccount.toLowerCase() === verifierAcc.toLowerCase()) {
      accountType = "verifier";
      setAccountType(accountType);
      connectVerifierWallet(currentAccount);
      retrieveData(accountType)
        .then((response) => {
          setAllTransactions(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (currentAccount.toLowerCase() === emitterAcc.toLowerCase()) {
      accountType = "emitter";
      setAccountType(accountType);
      connectEmitterWallet(currentAccount);
      retrieveData(accountType)
        .then((response) => {
          setAllTransactions(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      accountType = "";
      setAccountType(accountType);
    }
  };
  const handleEndDateChange = (e) => {
    const date = new Date(e.target.value);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    const field = e.target.name;

    let handleChange;
    switch (accountType) {
      case "issuer":
        handleChange = handleChangeIssuer;
        break;
      case "emitter":
        handleChange = handleEmitterChange;
        break;
      case "verifier":
        handleChange = handleVerifierChange;
        break;
      default:
        console.error("Unknown account type:", accountType);
        return;
    }

    handleChange({ target: { name: field, value: unixTimestamp } }, field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accountType === "issuer") {
      const { amount, end_date, verification_status, issued_date, status } =
        formIssuerData;
      console.log(amount, end_date, verification_status, issued_date, status);
      if (
        !amount ||
        !end_date ||
        !status ||
        !issued_date ||
        !verification_status
      ) {
        console.log("Missing required fields, returning early");
        return;
      }

      try {
        console.log("Sending transaction");
        await sendIssuerTransaction();
        console.log("Transaction sent");
        // Optionally, refresh the transactions list
        const updatedTransactions = await retrieveData("issuer");
        setAllTransactions(updatedTransactions.data);
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (accountType === "verifier") {
      console.log("Verifier functionality not implemented yet");
    } else if (accountType === "emitter") {
      const { credit_amount, date_bought, verification_status } =
        formEmitterData;
      console.log(credit_amount, date_bought, verification_status);
      if (!credit_amount || !date_bought || !verification_status) {
        console.log("Missing required fields, returning early");
        return;
      }
      try {
        console.log("Sending transaction");
        await sendEmitterTransaction();
        console.log("Transaction sent");
        // Optionally, refresh the transactions list
        const updatedTransactions = await retrieveData("emitter");
        setAllTransactions(updatedTransactions.data);
      } catch (error) {
        console.error("Error:", error);
      }
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
                <span className="mr-2 w-32">Verification Status:</span>
                <select
                  name="verification_status"
                  onChange={(e) => handleChangeIssuer(e, "verification_status")}
                  className="form-control border border-black p-2 ml-2"
                >
                  <option value="">Select Status</option>
                  <option value={0}>Unverified</option>
                  <option value={1}>Verified</option>
                </select>
              </div>
              <div className="flex items-center">
                <span className="mr-2 w-32">Date Issued:</span>
                <input
                  name="issued_date"
                  type="date"
                  onChange={handleEndDateChange}
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
                <span className="mr-2 w-32">Active Status:</span>
                <select
                  name="status"
                  onChange={(e) => handleChangeIssuer(e, "status")}
                  className="form-control border border-black p-2 ml-2"
                >
                  <option value="">Select Status</option>
                  <option value={0}>Inactive</option>
                  <option value={1}>Active</option>
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32"
              >
                Submit
              </button>
            </div>
            <div>
              {currentIssuerAccount ? (
                <p>Address: {currentIssuerAccount}</p>
              ) : null}
            </div>
            <div>
              <h1>Transactions</h1>
              {/* {currentIssuerAccount && <h2>Address: {currentIssuerAccount}</h2>} */}
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Address</th>
                    <th className="border border-gray-300 p-2">
                      Carbon Credit Amount
                    </th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Date Issued</th>
                    <th className="border border-gray-300 p-2">End Date</th>
                    <th className="border border-gray-300 p-2">
                      Verification Status
                    </th>
                    <th className="border border-gray-300 p-2">
                      Transaction Hash
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allTransactions.map((tx, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{`${tx.issuer_address.slice(
                        0,
                        4
                      )}...${tx.issuer_address.slice(-4)}`}</td>
                      <td className="border border-gray-300 p-2">
                        {tx.credit_amount}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {tx.active_status === 1 ? "Retired" : "Active"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {formatDate(tx.date_issued)}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {formatDate(tx.end_date)}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {tx.verification_status === 1
                          ? "Verified"
                          : "Unverified"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <a
                          href={`https://sepolia.etherscan.io/tx/${tx.transaction_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {tx.transaction_hash.slice(0, 4)}...
                          {tx.transaction_hash.slice(-4)}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                <span className="mr-2 w-32">Date of Purchase:</span>
                <input
                  name="date_bought"
                  type="date"
                  onChange={handleEndDateChange}
                  className="form-control border border-black p-2 ml-2"
                />
              </div>

              <div className="flex items-center">
                <span className="mr-2 w-32">Status:</span>
                <select
                  name="verification_status"
                  onChange={(e) =>
                    handleEmitterChange(e, "verification_status")
                  }
                  className="form-control border border-black p-2 ml-2"
                >
                  <option value="">Select Status</option>
                  <option value={0}>Unverified</option>
                  <option value={1}>Verified</option>
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32"
              >
                Submit
              </button>
            </div>
            <div>
              {currentEmitterAccount ? (
                <p>Address: {currentEmitterAccount}</p>
              ) : null}
            </div>
            <div>
              <h1>Transactions</h1>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Address</th>
                    <th className="border border-gray-300 p-2">
                      Carbon Credit Amount
                    </th>
                    <th className="border border-gray-300 p-2">Date Bought</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">
                      Transaction Hash
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allTransactions.map((tx, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        {tx.emitter_address}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {tx.credit_amount}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {formatDate(tx.date_bought)}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {tx.verification_status === 1
                          ? "Verified"
                          : "Unverified"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {tx.transaction_hash}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      default:
        return <p>Unknown account type</p>;
    }
  };

  return <>{renderContent()}</>;
}

export default InputPage;
