import React, { useState } from "react";

function emitterDashboard({
  handleSubmit,
  allTransactions,
  formatDate,
  currentEmitterAccount,
}) {
  const [formData, setFormData] = useState({
    project_name: "",
    credit_amount: "",
    date_bought: "",
    verification_status: "0",
    prev_tx: "",
  });

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Sending data");
    handleSubmit(formData);
  };

  return (
    <>
      <div className="Dashboard">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl font-bold"> Emitter Dashboard</h2>
        </div>

        <div className="flex flex-col gap-2">
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
            <span className="mr-2 w-32">Carbon Credit:</span>
            <input
              name="credit_amount"
              type="number"
              value={formData.credit_amount}
              onChange={(e) => handleChange(e, "credit_amount")}
              className="form-control border border-black p-2 ml-2"
            />
          </div>

          <div className="flex items-center">
            <span className="mr-2 w-32">Date of Purchase:</span>
            <input
              name="date_bought"
              type="date"
              value={formData.date_bought}
              onChange={(e) => handleChange(e, "date_bought")}
              className="form-control border border-black p-2 ml-2"
            />
          </div>

          <button
            onClick={onSubmit}
            className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32"
          >
            Submit
          </button>
        </div>
        <div>
          {currentEmitterAccount ? <p>Address: {currentEmitterAccount}</p> : null}
        </div>
        <div>
          <h1>Transactions</h1>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Project Name</th>
                <th className="border border-gray-300 p-2">
                  Carbon Credit Amount
                </th>
                <th className="border border-gray-300 p-2">Date Bought</th>
                <th className="border border-gray-300 p-2">Status</th>
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
                    {formatDate(tx.date_bought)}
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

export default emitterDashboard;
