import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PieChart, Pie, Cell, Label, Tooltip, Legend } from 'recharts';
import { shortenAddress } from "../../scripts/shortenAddress";
import TransactionSection from "./transactionSection";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

function VerifierDashboard({
  handleSubmit,
  emitterTransactions,
  issuerTransactions,
  allTransactions,
  formatDate,
  currentVerifierAccount,
  totalVerifiedCreditsIssued,
  totalVerifiedCreditsBought,
  totalVerifiedEmitter,
  totalVerifiedIssuer,
  totalTransactionCount,
}) {
  const [showIssuerTransactions, setShowIssuerTransactions] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(allTransactions);

  const data = [
    { name: 'Verified Emitter', value: totalVerifiedEmitter },
    { name: 'Verified Issuer', value: totalVerifiedIssuer },
    { name: 'Unverified', value: totalTransactionCount - totalVerifiedEmitter - totalVerifiedIssuer },
  ];

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

  return (
    <>
      <div>

        <div className="parent-div">
          <TransactionSection
            handleSubmit={handleSubmit}
            formatDate={formatDate}
            isIssuer={showIssuerTransactions}
            issuerTransactions={issuerTransactions}
            emitterTransactions={emitterTransactions}
            totalVerifiedCreditsIssued={totalVerifiedCreditsIssued}
            totalVerifiedCreditsBought={totalVerifiedCreditsBought}
            totalVerifiedIssuer={totalVerifiedIssuer}
            totalVerifiedEmitter={totalVerifiedEmitter}
            showIssuerTransactions={showIssuerTransactions}
            setShowIssuerTransactions={setShowIssuerTransactions}
            handleViewMore={handleViewMore}
          />
        </div>

        <div className="parent-div">
          <div className="verifier-div">
            <div className="verifier-div-upper">
              <div className="text-center">
                <p className="text-2xl font-bold">Transactions</p>
              </div>
              <div className="text-center">
                <PieChart width={200} height={200}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ outline: 'none' }} />
                    ))}
                    <Label
                      value={`${totalVerifiedEmitter + totalVerifiedIssuer}/${totalTransactionCount}`}
                      position="center"
                      className="bold-text"
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
                <div className="flex">
                  <span className="mr-4 text-right number-font" style={{ width: '2rem' }}>{totalVerifiedEmitter}</span>
                  <span className="flex-grow text-left">Emitter Transactions</span>
                </div>
                <div className="flex">
                  <span className="mr-4 text-right number-font" style={{ width: '2rem' }}>{totalVerifiedIssuer}</span>
                  <span className="flex-grow text-left">Issuer Transactions</span>
                </div>
                <div className="flex">
                  <span className="mr-4 text-right number-font" style={{ width: '2rem' }}>{totalTransactionCount - totalVerifiedEmitter - totalVerifiedIssuer}</span>
                  <span className="flex-grow text-left">Unverified</span>
                </div>
              </div>
            </div>
            <div className="verifier-div-lower">
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 className="text-xl font-bold">Recent Transactions</h2>
                <div className="relative">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleKeyUp}
                    placeholder="Search transactions"
                    className="pl-8 pr-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <TableContainer component={Paper} sx={{ borderTop: '2px solid rgba(224, 224, 224, 1)' }}>
                <Table aria-label="recent transactions table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Project Name</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Verification Date</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Transaction Hash</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { transactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">No transactions found</TableCell>
                      </TableRow>
                    ) : (
                      transactions.slice(0, 4).map((tx, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                          }}
                        >
                          <TableCell align="center">{tx.project_name}</TableCell>
                          <TableCell align="center">{tx.verification_date}</TableCell>
                          <TableCell align="center">{shortenAddress(tx.transaction_hash)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {transactions.length > 4 && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleViewMore}
                  >
                    View More
                  </Button>
                </div>
              )}
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
