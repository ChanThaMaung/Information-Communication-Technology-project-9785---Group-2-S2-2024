import React, { useContext, useState } from "react";
import { IssuerContext } from "../context/IssuerContext";
import { EmitterContext } from "../context/EmitterContext";
// import { VerifierContext } from "../context/VerifierContext";
import { connectWallet } from "../context/GlobalFunctions/connectWallet";

function InputPage() {
  const [contextToUse, setContextToUse] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");

  const getContextToUse = (address) => {
    // Convert address to lowercase for case-insensitive comparison
    const lowerAddress = address.toLowerCase();

    // Define one address for each role
    const issuerAddress =
      "0xf8E848eDC950D1455481e7D82a80098f35D2dCE6".toLowerCase();
    const emitterAddress =
      "0x21B4B54911cFA548C153daA6605161cBAa1eb878".toLowerCase();
    const verifierAddress =
      "0xed1626e677Ad1ad8dA0Cb707CD4a32A604AB0862".toLowerCase();

    if (lowerAddress === issuerAddress) {
      return IssuerContext;
    } else if (lowerAddress === emitterAddress) {
      return EmitterContext;
    // } else if (lowerAddress === verifierAddress) {
      return VerifierContext;
    } else {
      throw new Error("Address not associated with any known role");
    }
  };
  const handleConnectWallet = async () => {
    try {
      const address = await connectWallet();
      setCurrentAccount(address);
      const context = getContextToUse(address);
      setContextToUse(context);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  // Use contextToUse only after it has been set
  const contextValues = useContext(contextToUse || {});

  if (!contextToUse) {
    return (
      <div>
        <h2>Please connect your wallet</h2>
        <button
          onClick={handleConnectWallet}
          className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  const {  formData, sendTransaction, handleChange, transactions } = contextValues;

  const handleSubmit = (e) => {
    const { amount, end_date, status } = formData;
    e.preventDefault();

    if (!amount || !end_date || !status) return;

    sendTransaction();
  };
  return (
    <>
      <div>
        {!currentAccount ? (
          <button
            onClick={connectWallet}
            className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32"
          >
            Connect
          </button>
        ) : (
          <p>{currentAccount}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <span className="mr-2 w-32">Carbon Credit:</span>
          <input
            name="amount"
            type="number"
            onChange={(e) => handleChange(e, "amount")}
            className="form-control border border-black p-2 ml-2"
          />
        </div>

        <div className="flex items-center">
          <span className="mr-2 w-32">End Date:</span>
          <input
            name="end_date"
            type="text"
            onChange={(e) => handleChange(e, "end_date")}
            className="form-control border border-black p-2 ml-2"
          />
        </div>

        <div className="flex items-center">
          <span className="mr-2 w-32">Status:</span>
          <input
            name="status"
            type="text"
            onChange={(e) => handleChange(e, "status")}
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
      <div>
        <div>
          <h1>Transactions</h1>
          <h1>Address: {currentAccount}</h1>
          <ul>
            {transactions.map((tx, index) => (
              <li key={index}>
                Amount: {tx[1].toString()}, Timestamp: {tx[2].toString()}, End
                Date: {tx[3]}, Status: {tx[4].toString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default InputPage;
