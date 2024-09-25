import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PieChart, Pie, Cell, Label, Tooltip, Legend } from 'recharts';
import { shortenAddress } from "../../scripts/shortenAddress";
import TransactionSection from "./transactionSection";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import * as verifierAPI from "../../../../server/API/Verifier/get_by_address_api"
import {getUnverifiedIssuer} from "../../../../server/API/Issuer/get_issuer_api"
import {getUnverifiedEmitter} from "../../../../server/API/Emitter/get_emitter_api"
function VerifierDashboard({
  handleSubmit,
  formatDate,
  currentVerifierAccount,
  totalVerifiedCreditsBought,
  totalVerifiedCreditsIssued,

}) {
  const [showIssuerTransactions, setShowIssuerTransactions] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  const [allTransactions, setAllTransactions] = useState([]);
  const [totalVerifiedEmitter, setTotalVerifiedEmitter] = useState(0);
  const [totalVerifiedIssuer, setTotalVerifiedIssuer] = useState(0);
  const [emitterTransactions, setEmitterTransactions] = useState([]);
  const [issuerTransactions, setIssuerTransactions] = useState([]);


  useEffect(() => {
    const fetchTransactions = async () => {
      setEmitterTransactions(await getUnverifiedEmitter())
      setIssuerTransactions(await getUnverifiedIssuer())
      setTransactions(await verifierAPI.getByAddress(currentVerifierAccount));
      setAllTransactions(await verifierAPI.getByAddress(currentVerifierAccount));
    };
    fetchTransactions();
    fetchTransactionCount(0);
    fetchTransactionCount(1);

  }, []);

  const fetchTransactionCount = async (type) => {
    if (type === 0) {
      const response = await verifierAPI.getTransactionCount(currentVerifierAccount, type);
       setTotalVerifiedEmitter(response[0].transaction_count);
    } else {  
      const response = await verifierAPI.getTransactionCount(currentVerifierAccount, type);
       setTotalVerifiedIssuer(response[0].transaction_count);
    }
  }
  const data = [
    { name: 'Verified Emitter', value: totalVerifiedEmitter },
    { name: 'Verified Issuer', value: totalVerifiedIssuer },
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

  const refreshTransactions = async () => {
    // Fetch updated transactions
    const updatedIssuerTransactions = await getUnverifiedIssuer();
    const updatedEmitterTransactions = await getUnverifiedEmitter();
    const updatedAllTransactions = await verifierAPI.getByAddress(currentVerifierAccount);

    setEmitterTransactions(updatedEmitterTransactions); 
    setIssuerTransactions(updatedIssuerTransactions);
    setAllTransactions(updatedAllTransactions);

    // Optionally, update other related data
    // For example, update transaction counts
    const updatedIssuerCount = await verifierAPI.getTransactionCount(currentVerifierAccount, 1);
    const updatedEmitterCount = await verifierAPI.getTransactionCount(currentVerifierAccount, 0);
    setTotalVerifiedIssuer(updatedIssuerCount[0].transaction_count || 0);
    setTotalVerifiedEmitter(updatedEmitterCount[0].transaction_count || 0);
  };

  return (
    <>
      <div className="Dashboard">
        <TransactionSection
          handleSubmit={handleSubmit}
          formatDate={formatDate}
          isIssuer={showIssuerTransactions}
          issuerTransactions={issuerTransactions}
          emitterTransactions={emitterTransactions}
          totalVerifiedCreditsIssued={Number(totalVerifiedCreditsIssued)}
          totalVerifiedCreditsBought={Number(totalVerifiedCreditsBought)}
          totalVerifiedIssuer={Number(totalVerifiedIssuer)}
          totalVerifiedEmitter={Number(totalVerifiedEmitter)}
          showIssuerTransactions={showIssuerTransactions}
          setShowIssuerTransactions={setShowIssuerTransactions}
          handleViewMore={handleViewMore}
          refreshTransactions={refreshTransactions}
        />

        <div className="verifier-div">
          <div className="wrapper">
            <div className="verifier-lower-1">
              <div className="text-center">
                <p className="text-2xl font-bold">Transactions Verified</p>
              </div>
              <div className="text-center">
                <PieChart width={200} height={200}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ outline: 'none' }} />
                    ))}
                    <Label
                      value={`${totalVerifiedEmitter + totalVerifiedIssuer}`}
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
                  <span className="text-l font-bold" style={{ marginRight: '0.5rem' }}>{Math.round((totalVerifiedEmitter / (totalVerifiedEmitter + totalVerifiedIssuer)) * 100)}%</span>
                  <span className="text-l">Emitter Transactions</span>
                </div>
                <div className="flex">
                  <span className="text-l font-bold" style={{ marginRight: '0.5rem' }}>{Math.round((totalVerifiedIssuer / (totalVerifiedEmitter + totalVerifiedIssuer)) * 100)}%</span>
                  <span className="text-l">Issuer Transactions</span>
                </div>
              </div>
            </div>
            <div className="verifier-lower-2">
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2 className="text-3xl font-bold">Recent Transactions</h2>
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

                <TableContainer component={Paper} sx={{ width: '100%', borderTop: '2px solid rgba(224, 224, 224, 1)' }}>
                  <Table aria-label="recent transactions table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Project Name</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Verification Date</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Type</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Transaction Hash</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} align="center">No transactions found</TableCell>
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
                            <TableCell align="center">{tx.type === 0 ? 'Emitter' : 'Issuer'}</TableCell>
                            <TableCell align="center">
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
