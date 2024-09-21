import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function VerifierDashboard({
  handleSubmit,
  emitterTransactions,
  issuerTransactions,
  allTransactions,
  formatDate,
  currentVerifierAccount,
}) {
  const [showIssuerTransactions, setShowIssuerTransactions] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableTransaction, setEditableTransaction] = useState(null);
  const [periodCoveredRange, setPeriodCoveredRange] = useState([null, null]);
  const handleRowClick = async (transaction) => {
    transaction.verification_status = "1";

    setSelectedTransaction(transaction);
    setEditableTransaction({ ...transaction });
    if (transaction.period_covered) {
      const [startDate, endDate] = transaction.period_covered
        .split(" - ")
        .map((date) => new Date(date));
      setPeriodCoveredRange([startDate, endDate]);
    } else {
      setPeriodCoveredRange([null, null]);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
    setEditableTransaction(null);
    setPeriodCoveredRange([null, null]);
  };

  const handleInputChange = (e, field) => {
    setEditableTransaction({
      ...editableTransaction,
      [field]: e.target.value,
    });
  };

  const handleDateRangeChange = (update) => {
    setPeriodCoveredRange(update);
    const [start, end] = update;
    const stringValue =
      start && end
        ? `${start.toLocaleDateString("en-US")} - ${end.toLocaleDateString(
            "en-US"
          )}`
        : "";
    setEditableTransaction({
      ...editableTransaction,
      period_covered: stringValue,
    });
  };

  const verifyTransaction = async () => {
    console.log("verify button clicked", editableTransaction);
    closeModal();
    handleSubmit(editableTransaction);
  };

  return (
    <>
      <div className="verifier-dashboard">
        <div className="transaction-toggle">
          <button
            onClick={() => setShowIssuerTransactions(true)}
            className={`px-4 py-2 mr-2 ${
              showIssuerTransactions ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Issuer Transactions
          </button>
          <button
            onClick={() => setShowIssuerTransactions(false)}
            className={`px-4 py-2 ${
              !showIssuerTransactions ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Emitter Transactions
          </button>
        </div>

        {showIssuerTransactions ? (
          <div className="issuer-transactions">
            <h2 className="text-xl font-bold mb-4">Issuer Transactions</h2>
            <div className="flex">
              <div className="w-1/5 pr-4">
                <div className="border border-gray-300 rounded-lg p-4">Piechart</div>
              </div>
              <div className="w-4/5">
                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2">Project Name</th>
                      <th className="border border-gray-300 p-2">Issued Date</th>
                      <th className="border border-gray-300 p-2">Old Transaction Hash</th>
                      <th className="border border-gray-300 p-2">Transaction Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issuerTransactions.map((tx, index) => (
                      <tr
                        key={index}
                        onClick={() => handleRowClick(tx)}
                        className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                      >
                        <td className="border border-gray-300 p-2">{tx.project_name}</td>
                        <td className="border border-gray-300 p-2">{formatDate(tx.date_issued)}</td>
                        <td className="border border-gray-300 p-2">{tx.prev_tx ? tx.prev_tx : "N/A"}</td>
                        <td className="border border-gray-300 p-2">{tx.transaction_hash}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <div className="border border-gray-300 rounded-lg p-4 w-1/5">
                <p className="text-2xl font-bold">N</p>
                <p className="text-sm">Number of verified issued carbon credits</p>
              </div>
              <div className="border border-gray-300 rounded-lg p-4 w-3/4">
                <p>Graph</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="emitter-transactions">
            <h2 className="text-xl font-bold mb-4">Emitter Transactions</h2>
            <div className="flex">
              <div className="w-1/5 pr-4">
                <div className="border border-gray-300 rounded-lg p-4">Piechart</div>
              </div>
              <div className="w-4/5">
                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2">Emitter Name</th>
                      <th className="border border-gray-300 p-2">Date Bought</th>
                      <th className="border border-gray-300 p-2">Old Transaction Hash</th>
                      <th className="border border-gray-300 p-2">Transaction Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emitterTransactions.map((tx, index) => (
                      <tr
                        key={index}
                        onClick={() => handleRowClick(tx)}
                        className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                      >
                        <td className="border border-gray-300 p-2">{tx.project_name}</td>
                        <td className="border border-gray-300 p-2">{formatDate(tx.date_bought)}</td>
                        <td className="border border-gray-300 p-2">{tx.prev_tx ? tx.prev_tx : "N/A"}</td>
                        <td className="border border-gray-300 p-2">{tx.transaction_hash}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <div className="border border-gray-300 rounded-lg p-4 w-1/5">
                <p className="text-2xl font-bold">N</p>
                <p className="text-sm">Number of verified bought carbon credits</p>
              </div>
              <div className="border border-gray-300 rounded-lg p-4 w-3/4">
                <p>Graph</p>
              </div>
            </div>
          </div>
        )}

        <div className="verifier-transactions">
          <h2 className="text-xl font-bold mb-4">Verifier Transactions</h2>
          <div className="flex">
            <div className="w-1/5 pr-4">
              <div className="border border-gray-300 rounded-lg p-4">
                <p className="text-2xl font-bold">0%</p>
                <p className="text-sm">verified/total transactions verified</p>
              </div>
            </div>
            <div className="w-4/5">
              <table className="border-collapse w-full">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Project Name</th>
                    <th className="border border-gray-300 p-2">Verification Date</th>
                    <th className="border border-gray-300 p-2">Transaction Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {allTransactions.map((tx, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                    >
                      <td className="border border-gray-300 p-2">{tx.project_name}</td>
                      <td className="border border-gray-300 p-2">{tx.verification_date}</td>
                      <td className="border border-gray-300 p-2">{tx.transaction_hash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {isModalOpen && selectedTransaction && editableTransaction && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            onClick={closeModal}
          >
            <div
              className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-3 right-3">
                <button
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="mt-3">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                  {editableTransaction.date_bought
                    ? "Verify Emitter Transaction"
                    : "Verify Issuer Transaction"}
                </h3>
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-gray-700">
                        Project Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-gray-700">
                        Date
                      </th>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-gray-700">
                        Carbon Credit Amount
                      </th>
                      {showIssuerTransactions && (
                        <>
                          <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-gray-700">
                            Period Covered
                          </th>
                          <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-medium text-gray-700">
                            Status
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          value={editableTransaction.project_name}
                          onChange={(e) => handleInputChange(e, "project_name")}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          value={formatDate(
                            editableTransaction.date_issued ||
                              editableTransaction.date_bought
                          )}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              editableTransaction.date_issued
                                ? "date_issued"
                                : "date_bought"
                            )
                          }
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          value={editableTransaction.credit_amount}
                          onChange={(e) =>
                            handleInputChange(e, "credit_amount")
                          }
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      {showIssuerTransactions && (
                        <>
                          <td className="border border-gray-300 px-4 py-2">
                            <DatePicker
                              selectsRange={true}
                              startDate={periodCoveredRange[0]}
                              endDate={periodCoveredRange[1]}
                              onChange={handleDateRangeChange}
                              dateFormat="MM/dd/yyyy"
                              className="w-full p-1 border rounded"
                              placeholderText="Select date range"
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <select
                              value={editableTransaction.active_status}
                              onChange={(e) =>
                                handleInputChange(e, "active_status")
                              }
                              className="w-full p-1 border rounded"
                            >
                              <option value="0">Active</option>
                              <option value="1">Retired</option>
                            </select>
                          </td>
                        </>
                      )}
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 flex justify-center">
                  <button
                    className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                    onClick={verifyTransaction}
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default VerifierDashboard;
