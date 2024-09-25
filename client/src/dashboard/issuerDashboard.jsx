import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function issuerDashboard({
  handleSubmit,
  allTransactions,
  formatDate,
  currentIssuerAccount,
}) {
  const [formData, setFormData] = useState({
    project_name: "",
    credit_amount: "",
    date_issued: 0,
    active_status: "",
    period_covered: "",
    verification_status: "0",
    prev_tx: "",
  });

  const [dateRange, setDateRange] = useState([null, null]);

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleDateRangeChange = (update) => {
    setDateRange(update);
    const [start, end] = update;
    const stringValue = start && end
      ? `${start.toLocaleDateString('en-US')} - ${end.toLocaleDateString('en-US')}`
      : '';
    setFormData(prevData => ({
      ...prevData,
      period_covered: stringValue
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Sending fromdata:", formData);
    handleSubmit(formData);
  };

  return (
    <>
      <div className="Dashboard">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl font-bold">Issuer Dashboard</h2>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="mr-2 w-32">Project Name:</span>
            <input
              name="project_name"
              type="text"
              value={formData.project_name}
              onChange={(e) => handleChange(e, "project_name")}
              className="form-control border border-black p-2 ml-2"
            />
          </div>
          <div className="flex items-center">
            <span className="mr-2 w-32">Carbon Credit Amount:</span>
            <input
              name="credit_amount"
              type="number"
              value={formData.credit_amount}
              onChange={(e) => handleChange(e, "credit_amount")}
              className="form-control border border-black p-2 ml-2"
            />
          </div>
          <div className="flex items-center">
            <span className="mr-2 w-32">Date Issued:</span>
            <input
              name="date_issued"
              type="date"
              onChange={(e) => handleChange(e, "date_issued")}
              className="form-control border border-black p-2 ml-2"
            />
          </div>
          <div className="flex items-center">
            <span className="mr-2 w-32">Active Status:</span>
            <select
              name="active_status"
              value={formData.active_status}
              onChange={(e) => handleChange(e, "active_status")}
              className="form-control border border-black p-2 ml-2"
            >
              <option value="">Select Status</option>
              <option value="0">Issued</option>
              <option value="1">Retired</option>
            </select>
          </div>
          <div className="flex items-center">
            <span className="mr-2 w-32">Period Covered:</span>
            <DatePicker
              selectsRange={true}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={handleDateRangeChange}
              dateFormat="MM/dd/yyyy"
              className="form-control border border-black p-2 ml-2"
              placeholderText="Select date range"
            />
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32"
          >
            Submit
          </button>
        </form>
        <div>
          {currentIssuerAccount ? <p>Address: {currentIssuerAccount}</p> : null}
        </div>
        <div>
          <h1>Transactions</h1>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Project Name</th>
                <th className="border border-gray-300 p-2">Carbon Credit</th>
                <th className="border border-gray-300 p-2">Active Status</th>
                <th className="border border-gray-300 p-2">Issuance Date</th>
                <th className="border border-gray-300 p-2">Period Covered</th>
                <th className="border border-gray-300 p-2">
                  Verification Status
                </th>
                <th className="border border-gray-300 p-2">Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
              {allTransactions.map((tx, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    {tx.project_name}
                  </td>
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
                    {tx.period_covered}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {tx.verification_status === 1 ? "Verified" : "Unverified"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <a
                      href={`https://sepolia.etherscan.io/tx/${tx.transaction_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {tx.transaction_hash}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default issuerDashboard;
