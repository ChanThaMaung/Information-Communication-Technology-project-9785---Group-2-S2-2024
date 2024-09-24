import React, { useState, useEffect } from 'react';
import { shortenAddress } from "../../scripts/shortenAddress";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
const TransactionDetailsPopup = ({ transaction, open, onClose, handleSubmit }) => {
    const [editedTransaction, setEditedTransaction] = useState({});

    useEffect(() => {
        if (transaction) {
            const { prev_tx, transaction_hash, verification_status, address, ...rest } = transaction;
            // Format dates for input fields
            const formattedTransaction = Object.entries(rest).reduce((acc, [key, value]) => {
                if (key === 'date_issued' || key === 'date_bought') {
                    // Ensure the date is in YYYY-MM-DD format for the input field
                    const date = new Date(value);
                    console.log(date);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based, so add 1
                    const day = String(date.getDate()).padStart(2, '0');
                    acc[key] = `${year}-${month}-${day}`;
                    console.log(acc[key]);
                }
                else if (key === 'active_status') {
                    acc[key] = value.toString();
                }
                else {
                    acc[key] = value;
                }
                return acc;
            }, {});

            setEditedTransaction(formattedTransaction);
            console.log(formattedTransaction);
        }
    }, [transaction]);

    if (!transaction) return null;

    const getDisplayName = (key) => {
        return propertyDisplayNames[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
    };

    const handleChange = (key, value) => {
        setEditedTransaction(prev => ({ ...prev, [key]: value }));
    };

    const verifyTransaction = () => {
        editedTransaction.verification_status = "1";
        editedTransaction.prev_tx = "";
        editedTransaction.transaction_hash = transaction.transaction_hash;
        // Here you would typically send the editedTransaction to your backend
        console.log('Saving edited transaction:', editedTransaction);
        handleSubmit(editedTransaction);
        onClose();
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
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={verifyTransaction} color="primary" variant="contained">
                    Verify
                </Button>
            </DialogActions>
        </Dialog>
    );
};

function TransactionSection({
    handleSubmit,
    formatDate,
    isIssuer,
    issuerTransactions,
    emitterTransactions,
    totalVerifiedCreditsIssued,
    totalVerifiedCreditsBought,
    totalVerifiedIssuer,
    totalVerifiedEmitter,
    showIssuerTransactions,
    setShowIssuerTransactions,
    handleViewMore,
}) {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [allTransactions, setAllTransactions] = useState([]);
    const transactions = isIssuer ? issuerTransactions : emitterTransactions;
    const title = isIssuer ? "Issuer Transactions" : "Emitter Transactions";
    const totalVerifiedCredits = isIssuer ? totalVerifiedCreditsIssued : totalVerifiedCreditsBought;
    const totalVerifiedTransactions = isIssuer ? totalVerifiedIssuer : totalVerifiedEmitter;
    const creditType = isIssuer ? "issued" : "bought";

    useEffect(() => {
        setAllTransactions(transactions);
    }, [transactions]);

    const handleRowClick = (tx) => {
        setSelectedTransaction(tx);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleKeyUp = (event) => {
        const inputValue = event.target.value;
        setSearchInput(inputValue);
        // Perform search or filter logic here using inputValue
        // For example, filter transactions based on project name
        const filtered = (isIssuer ? issuerTransactions : emitterTransactions).filter(tx =>
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
                                <TableCell colSpan={4} align="center">Empty</TableCell>
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
                                    <TableCell align="center">{tx.prev_tx ? shortenAddress(tx.prev_tx) : "N/A"}</TableCell>
                                    <TableCell align="center">{shortenAddress(tx.transaction_hash)}</TableCell>
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
            <div style={{ width: '25%', marginRight: '1rem', paddingRight: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ borderRadius: '0.5rem', padding: '1rem', width: '100%', textAlign: 'center' }}>
                    <p className="bold-text">{(totalVerifiedCredits || 0).toLocaleString()}</p>
                    <p className="text-sm">Number of verified {creditType.toLocaleString()} carbon credits</p>
                </div>
                <div style={{ width: '100%', marginLeft: '1rem' }}>
                    <hr className="divider" />
                </div>
                <div style={{ borderRadius: '0.5rem', padding: '1rem', width: '100%', textAlign: 'center' }}>
                    <p className="bold-text">{totalVerifiedTransactions}</p>
                    <p className="text-sm">Number of verified {isIssuer ? 'issuer' : 'emitter'} transactions</p>
                </div>
            </div>
            <div style={{ width: '100%', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', position: 'relative', textAlign: 'center', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 className="text-xl font-bold">{title}</h2>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search transactions"
                                className="pl-8 pr-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchInput}
                                onChange={handleKeyUp}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setShowIssuerTransactions(!showIssuerTransactions)}
                            style={{ marginLeft: '1rem' }}
                        >
                            {showIssuerTransactions ? "Switch to Emitter Transactions" : "Switch to Issuer Transactions"}
                        </Button>
                    </div>
                </div>
                {renderTransactionTable(allTransactions, isIssuer ? "issuer" : "emitter")}
            </div>
            <TransactionDetailsPopup
                transaction={selectedTransaction}
                open={isPopupOpen}
                onClose={handleClosePopup}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default TransactionSection;
