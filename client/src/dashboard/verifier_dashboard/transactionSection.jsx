import React, { useState, useEffect } from 'react';
import { shortenAddress } from "../../scripts/shortenAddress";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../css_files/verifierDashboard.css';
import * as verifierAPI from "../../../../server/API/Verifier/get_by_address_api"
// Add this mapping object outside of your component
const propertyDisplayNames = {
    project_name: "Project Name",
    credit_amount: "Credit Amount",
    date_issued: "Date Issued",
    date_bought: "Date Bought",
    active_status: "Status",
    // Add more mappings as needed
};

// Updated TransactionDetailsPopup component
const TransactionDetailsPopup = ({ transaction, open, onClose, handleSubmit, refreshTransactions }) => {
    const [editedTransaction, setEditedTransaction] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (transaction) {
            const { verification_status, prev_tx, transaction_hash, issuer_address, timestamp,...rest } = transaction;
            // Format dates for input fields
            const formattedTransaction = Object.entries(rest).reduce((acc, [key, value]) => {
                if (key === 'date_issued') {
                    const date = new Date(value);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    acc[key] = `${year}-${month}-${day}`;
                }
                else if (key === 'active_status') {
                    acc[key] = value.toString();
                }
                else if (key === 'prev_tx') {
                    acc[key] = value || 'N/A';
                }
                else {
                    acc[key] = value;
                }
                return acc;
            }, {});

            setEditedTransaction(formattedTransaction);
        }
    }, [transaction]);

    if (!transaction) return null;

    const getDisplayName = (key) => {
        if (key === 'issuer_address') return 'Issuer Address';
        return propertyDisplayNames[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
    };

    const handleChange = (key, value) => {
        setEditedTransaction(prev => ({ ...prev, [key]: value }));
    };

    const verifyTransaction = async () => {
        if (isSubmitting) return;
        let updatedTransaction = {};
        setIsSubmitting(true);

        updatedTransaction = {
            ...editedTransaction,
            verification_status: "1",
            prev_tx: transaction.transaction_hash,
            issuer_address: transaction.issuer_address,
            transaction_hash: transaction.transaction_hash,
        };

        console.log('Saving edited transaction:', updatedTransaction);
        try {
            await handleSubmit(updatedTransaction);
            await refreshTransactions();
            onClose();
        } catch (error) {
            console.error("Error submitting edit:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Transaction Details
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {Object.entries(editedTransaction).map(([key, value]) => (
                                <TableRow key={key}>
                                    <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                                        {getDisplayName(key)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {key === 'active_status' ? (
                                            <Select
                                                value={value}
                                                onChange={(e) => handleChange(key, e.target.value)}
                                                fullWidth
                                            >
                                                <MenuItem value="0">Active</MenuItem>
                                                <MenuItem value="1">Retired</MenuItem>
                                            </Select>
                                        ) : key === 'prev_tx' || key === 'transaction_hash' || key === 'issuer_address' ? (
                                            <TextField
                                                fullWidth
                                                value={value}
                                                disabled
                                            />
                                        ) : (
                                            <TextField
                                                fullWidth
                                                value={value}
                                                onChange={(e) => handleChange(key, e.target.value)}
                                                type={key.includes('date') ? 'date' : 'text'}
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button onClick={verifyTransaction} color="primary" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? 'Verifying...' : 'Verify'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

function TransactionSection({
    handleSubmit,
    formatDate,
    issuerTransactions,
    handleViewMore,
    refreshTransactions,
    totalVerifiedIssuer,
    unverifiedCount,
    currentVerifierAccount,
}) {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [allTransactions, setAllTransactions] = useState([]);
    const [totalVerifiedCredits, setTotalVerifiedCredits] = useState(0);

    useEffect(() => {
        const fetchTotalCredits = async () => {
            const response = await verifierAPI.getTotalCreditsByAddress(currentVerifierAccount);
            setTotalVerifiedCredits(response[0].total_credits);
        };
        fetchTotalCredits();
        setAllTransactions(issuerTransactions);
    }, [issuerTransactions]);

    const handleRowClick = (tx) => {
        setSelectedTransaction(tx);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedTransaction(null);
    };

    const handleKeyUp = (event) => {
        const inputValue = event.target.value;
        setSearchInput(inputValue);
        const filtered = (issuerTransactions).filter(tx =>
            tx.project_name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setAllTransactions(filtered);
    };

    const renderTransactionTable = (allTransactions) => (
        <>
            <TableContainer component={Paper} sx={{ borderTop: '2px solid rgba(224, 224, 224, 1)' }}>
                <Table sx={{ minWidth: 650 }} aria-label="transaction table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Project Name</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Date</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Old Transaction Hash</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Transaction Hash</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allTransactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">No transactions</TableCell>
                            </TableRow>
                        ) : (
                            allTransactions.slice(0, 4).map((tx, index) => (
                                <TableRow
                                    key={index}
                                    onClick={() => handleRowClick(tx)}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                                        '&:last-child td, &:last-child th': { border: 0 }
                                    }}
                                >
                                    <TableCell align="center" component="th" scope="row">{tx.project_name}</TableCell>
                                    <TableCell align="center">{formatDate(tx.date_issued || tx.date_bought)}</TableCell>
                                    <TableCell align="center">
                                        {tx.prev_tx ? (
                                            <a href={`https://etherscan.io/tx/${tx.prev_tx}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                                {shortenAddress(tx.prev_tx)}
                                            </a>
                                        ) : "N/A"}
                                    </TableCell>
                                    <TableCell align="center">
                                        <a href={`https://etherscan.io/tx/${tx.transaction_hash}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                            {shortenAddress(tx.transaction_hash)}
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {allTransactions.length > 3 && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <Button variant="contained" color="primary" onClick={handleViewMore}>View More</Button>
                </div>
            )}
        </>
    );

    return (
        <div className="verifier-div">
            <div className="wrapper">
                <div className="verifier-upper-1">
                    <div className="verifier-upper-1-upper">
                        <p className="bold-text">{(totalVerifiedCredits || 0).toLocaleString()}</p>
                        <p className="emitter-item-header text-sm justify-center">MtCO2 Verified</p>
                    </div>
                    <div style={{ width: '100%', marginLeft: '1rem' }}>
                        <hr className="divider" />
                    </div>
                    <div style={{ borderRadius: '0.5rem', padding: '1rem', width: '100%', textAlign: 'center' }}>
                        <p className="bold-text" style={{paddingLeft: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            {Math.round((totalVerifiedIssuer / (unverifiedCount + totalVerifiedIssuer)) * 100)} <span style={{fontSize: '1.5rem', marginLeft: '0.5rem'}}>%</span>
                        </p>
                        <p className="emitter-item-header text-sm justify-center">Projects Verified</p>
                    </div>
                </div>
                <div className="verifier-upper-2">
                    <div style={{ width: '100%', position: 'relative', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <h2 className="text-3xl font-bold">Unverified Issuer Transactions</h2>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="verifier-upper-search-bar">
                                <input
                                    type="text"
                                    placeholder="Search transactions"
                                    className="search-input"
                                    value={searchInput}
                                    onChange={handleKeyUp}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    {renderTransactionTable(allTransactions, "issuer")}
                </div>
                <TransactionDetailsPopup
                    transaction={selectedTransaction}
                    open={isPopupOpen}
                    onClose={handleClosePopup}
                    handleSubmit={handleSubmit}
                    refreshTransactions={refreshTransactions}
                />
            </div>
        </div>
    );
}

export default TransactionSection;
