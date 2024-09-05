import React, { useContext } from "react";
import { IssuerContext } from "../context/IssuerContext";

function InputPage() {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    transactions,
  } = useContext(IssuerContext);

  const handleEndDateChange = (e) => {
    const date = new Date(e.target.value);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    handleChange({ target: { name: 'end_date', value: unixTimestamp } }, 'end_date');
  };

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
            onChange={(e) => handleChange(e, "status")}
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
      <div>
        <div>
          <h1>Transactions</h1>
          <h1>Address: {currentAccount}</h1>
          <ul>
            {transactions.map((tx, index) => (
              <li key={index}>
                Amount: {tx[1].toString()}, Timestamp:{" "}
                {tx[2].toString()}, End Date: {tx[3]}, Status:{" "}
                {tx[4].toString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default InputPage;
