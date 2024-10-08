import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Label, Tooltip, Legend } from 'recharts';
import { shortenAddress } from "../../scripts/shortenAddress";
import TransactionSection from "./transactionSection";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import * as verifierAPI from "../../../../server/API/Verifier/get_by_address_api"
import { getUnverifiedIssuer, getUnverifiedCount } from "../../../../server/API/Issuer/get_issuer_api"
import '../css_files/verifierDashboard.css';
import '../css_files/emitterDashboard.css';
function VerifierDashboard({
  handleSubmit,
  formatDate,
  currentVerifierAccount,

}) {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  const [allTransactions, setAllTransactions] = useState([]);
  const [totalVerifiedIssuer, setTotalVerifiedIssuer] = useState(0);
  const [totalUnverifiedIssuer, setTotalUnverifiedIssuer] = useState(0);
  const [issuerTransactions, setIssuerTransactions] = useState([]);
  const [pieData, setPieData] = useState(
    [{
      name: 'Unverified Transactions',
      value: 0
    },
    {
      name: 'Verified Transactions',
      value: 0
    }]
  );


  useEffect(() => {
    const fetchTransactions = async () => {
      setIssuerTransactions(await getUnverifiedIssuer())
      setTransactions(await verifierAPI.getByAddress(currentVerifierAccount)); // to show in table
      setAllTransactions(await verifierAPI.getByAddress(currentVerifierAccount)); // to show in search bar
    };
    fetchTransactions();
    fetchTransactionCount();

  }, [currentVerifierAccount]);

  const fetchTransactionCount = async () => {
    const getUnverified = await getUnverifiedCount();
    const getVerifiedCount = await verifierAPI.getTransactionCount(currentVerifierAccount);

    const unverifiedIssuerCount = getUnverified[0].unverified_count;
    const verifiedCount = getVerifiedCount[0].transaction_count;

    setTotalVerifiedIssuer(verifiedCount);
    setTotalUnverifiedIssuer(unverifiedIssuerCount);

    setPieData([{
      name: 'Unverified Transactions',
      value: unverifiedIssuerCount
    },
    {
      name: 'Verified Transactions',
      value: verifiedCount
    }
    ]);
  }

  const COLORS = ['#1C4E80', '#EA6A47', '#A5D8DD'];

  const handleViewMore = () => {
    navigate('/transaction_page');  // Adjust this path as needed
  };


  const handleKeyUp = (event) => {
    const searchValue = event.target.value;
    setSearchInput(searchValue);
    const filtered = allTransactions.filter(tx =>
      tx.project_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setTransactions(filtered);
  };

  const refreshTransactions = async () => {
    // Fetch updated transactions
    const updatedIssuerTransactions = await getUnverifiedIssuer();
    const updatedAllTransactions = await verifierAPI.getByAddress(currentVerifierAccount);

    setIssuerTransactions(updatedIssuerTransactions);
    setAllTransactions(updatedAllTransactions);

    const updatedIssuerCount = await verifierAPI.getTransactionCount(currentVerifierAccount);
    setTotalVerifiedIssuer(updatedIssuerCount[0].transaction_count || 0);
  };

  return (
    <>
      <div className="Dashboard">
        <TransactionSection
          handleSubmit={handleSubmit}
          formatDate={formatDate}
          issuerTransactions={issuerTransactions}
          totalVerifiedIssuer={Number(totalVerifiedIssuer)}
          handleViewMore={handleViewMore}
          refreshTransactions={refreshTransactions}
          unverifiedCount={totalUnverifiedIssuer}
          currentVerifierAccount={currentVerifierAccount}
        />

        <div className="verifier-div">
          <div className="wrapper">
            <div className="verifier-lower-1">
              <div className="text-center">
                <p className="emitter-item-header verifier-transaction-text">Transactions Verified</p>
              </div>
              <div>
                <PieChart width={200} height={200} className="pie-chart-container">
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                  
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ outline: 'none' }} />
                    ))}
                    <Label
                      value={`${totalVerifiedIssuer}`}
                      position="center"
                      className="verifier-bold-text"  // Changed from "bold-text" to "verifier-bold-text"
                    />
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                    itemStyle={{ color: '#000' }}
                    cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                  />
                </PieChart>
              </div>
              <div className="mt-2">

                {/* <div className="flex">
                  <span className="text-l font-bold" style={{ marginRight: '0.5rem' }}>{Math.round((totalVerifiedIssuer / (totalVerifiedEmitter + totalVerifiedIssuer)) * 100)}%</span>
                  <span className="text-l text-gray-500 font-bold">Issuer Transactions</span>
                </div> */}
              </div>
            </div>
            <div className="verifier-lower-2">
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2 className="verifier-header-text">Recent Transactions</h2>
              </div>

              <div style={{ width: '100%' }}>
                <div style={{ width: '100%', marginBottom: '1rem', position: 'relative' }}>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleKeyUp}
                    placeholder="Search transactions"
                    className="search-input"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="div-table-container" style={{ height: '300px', overflow: 'auto', width: '100%' }}>
                  <TableContainer className="table-container" component={Paper} sx={{ overflow: 'initial',width: '100%', borderTop: '2px solid rgba(224, 224, 224, 1)' }}>
                    <Table stickyHeader aria-label="recent transactions table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="table-cell" align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Project Name</TableCell>
                          <TableCell className="table-cell" align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Verification Date</TableCell>
                          <TableCell className="table-cell" align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Transaction Hash</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transactions.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} align="center">No transactions found</TableCell>
                          </TableRow>
                        ) : (
                          transactions.map((tx, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                              }}
                            >
                              <TableCell className="table-cell" align="center">{tx.project_name}</TableCell>
                              <TableCell className="table-cell" align="center">{formatDate(tx.verification_date)}</TableCell>
                              <TableCell className="table-cell" align="center">
                                <a href={`https://etherscan.io/tx/${tx.transaction_hash}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'blue' }}>
                                  {shortenAddress(tx.transaction_hash)}
                                </a>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {INSERT MODAL OPEN HERE} */}

        {/* {INSERT SHOW TRANSACTIONS HERE} */}
      </div>
    </>
  );
}

export default VerifierDashboard;
