import  { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Button } from '@mui/material';
// import FilterListIcon from '@mui/icons-material/FilterList'; IconButton
// import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import * as issuerAPI from "../../../../server/API/Issuer/get_issuer_api";
import * as emitterAPI from "../../../../server/API/Emitter/get_emitter_api";
import * as verifierAPI from "../../../../server/API/Verifier/get_verifier_api";
import { shortenAddress } from "../../scripts/shortenAddress";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const formatStatus = (status) => status === 1 ? "Verified" : "Unverified";
const formatActiveStatus = (status) => status === 1 ? "Retired" : "Active";

function TransactionPage() {
    const [selectedMenu, setSelectedMenu] = useState("issuer");
    const [allIssuers, setAllIssuers] = useState([]);
    const [allEmitters, setAllEmitters] = useState([]);
    const [allVerifiers, setAllVerifiers] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            setAllIssuers(await issuerAPI.getAllIssuer());
        };
        fetchInitialData();
    }, []);

    const handleMenuChange = async (event) => {
        setSelectedMenu(event.target.value);
        if (event.target.value === "issuer") {
            setAllIssuers(await issuerAPI.getAllIssuer());
        } else if (event.target.value === "emitter") {
            setAllEmitters(await emitterAPI.getAllEmitter());
        } else if (event.target.value === "verifier") {
            setAllVerifiers(await verifierAPI.getAllVerifier());
        }
    };

    const renderTableContent = () => {
        switch (selectedMenu) {
            case "issuer":
                return (
                    <TableBody>
                        {allIssuers.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell>{transaction.project_name}</TableCell>
                                <TableCell align="center">
                                    <a href={`https://explorer.example.com/address/${transaction.issuer_address}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                        {shortenAddress(transaction.issuer_address)}
                                    </a>
                                </TableCell>
                                <TableCell align="center">{transaction.credit_amount}</TableCell>
                                <TableCell align="center">{formatDate(transaction.date_issued)}</TableCell>
                                <TableCell align="center">{transaction.period_covered}</TableCell>
                                <TableCell align="center">{formatStatus(transaction.verification_status)}</TableCell>
                                <TableCell align="center">{formatActiveStatus(transaction.active_status)}</TableCell>
                                <TableCell align="center">
                                    {transaction.prev_tx ? (
                                        <a href={`https://explorer.example.com/tx/${transaction.prev_tx}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                            {shortenAddress(transaction.prev_tx)}
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    <a href={`https://explorer.example.com/tx/${transaction.transaction_hash}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                        {shortenAddress(transaction.transaction_hash)}
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                );
            case "emitter":
                return (
                    <TableBody>
                        {allEmitters.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{transaction.project_name}</TableCell>
                                <TableCell align="center">
                                    <a href={`https://explorer.example.com/address/${transaction.emitter_address}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                        {shortenAddress(transaction.emitter_address)}
                                    </a>
                                </TableCell>
                                <TableCell align="center">{transaction.credit_amount}</TableCell>
                                <TableCell align="center">{formatDate(transaction.date_bought)}</TableCell>
                                <TableCell align="center">{formatStatus(transaction.verification_status)}</TableCell>
                                <TableCell align="center">{formatActiveStatus(transaction.active_status)}</TableCell>
                                <TableCell align="center">
                                    {transaction.prev_tx ? (
                                        <a href={`https://explorer.example.com/tx/${transaction.prev_tx}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                            {shortenAddress(transaction.prev_tx)}
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    <a href={`https://explorer.example.com/tx/${transaction.transaction_hash}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                        {shortenAddress(transaction.transaction_hash)}
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                );
            case "verifier":
                return (
                    <TableBody>
                        {allVerifiers.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{transaction.project_name}</TableCell>
                                <TableCell align="center">{transaction.verification_date}</TableCell>
                                <TableCell align="center">
                                    <a href={`https://explorer.example.com/address/${transaction.verifier_address}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                        {shortenAddress(transaction.verifier_address)}
                                    </a>
                                </TableCell>
                                <TableCell align="center">
                                    <a href={`https://explorer.example.com/tx/${transaction.transaction_hash}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                        {shortenAddress(transaction.transaction_hash)}
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="Dashboard">
                <div className="transaction-page">
                    <h1 className="bold-text">Transactions</h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                            <TextField
                                select
                                variant="outlined"
                                defaultValue="issuer"
                                onChange={handleMenuChange}
                            >
                                <MenuItem value="emitter">Emitter</MenuItem>
                                <MenuItem value="issuer">Issuer</MenuItem>
                                <MenuItem value="verifier">Verifier</MenuItem>
                            </TextField>
                        </div>
                        <div>
                            <TextField
                                select
                                variant="outlined"
                                label="Name"
                                defaultValue=""
                                style={{ minWidth: '150px', marginRight: '10px' }}
                            >
                                <MenuItem value="registry1">Registry 1</MenuItem>
                                <MenuItem value="registry2">Registry 2</MenuItem>
                            </TextField>
                            <TextField
                                select
                                variant="outlined"
                                label="Date"
                                defaultValue=""
                                style={{ minWidth: '150px', marginRight: '10px' }}
                            >
                                <MenuItem value="methodology1">Methodology 1</MenuItem>
                                <MenuItem value="methodology2">Methodology 2</MenuItem>
                            </TextField>
                            <TextField
                                select
                                variant="outlined"
                                label="Period Covered"
                                defaultValue=""
                                style={{ minWidth: '150px', marginRight: '10px' }}
                            >
                                <MenuItem value="sector1">Sector 1</MenuItem>
                                <MenuItem value="sector2">Sector 2</MenuItem>
                            </TextField>
                            <TextField
                                select
                                variant="outlined"
                                label="Status"
                                defaultValue=""
                                style={{ minWidth: '150px', marginRight: '10px' }}
                            >
                                <MenuItem value="country1">Country 1</MenuItem>
                                <MenuItem value="country2">Country 2</MenuItem>
                            </TextField>
                            <TextField
                                select
                                variant="outlined"
                                label="Verified Status"
                                defaultValue=""
                                style={{ minWidth: '175px', marginRight: '10px' }}
                            >
                                <MenuItem value="period1">Period 1</MenuItem>
                                <MenuItem value="period2">Period 2</MenuItem>
                            </TextField>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SearchIcon />}
                                style={{ backgroundColor: 'transparent', color: '#000000' }}
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {selectedMenu === "issuer" && (
                                        <>
                                            <TableCell align="center">Project Name</TableCell>
                                            <TableCell align="center">Address</TableCell>
                                            <TableCell align="center">Credit Amount</TableCell>
                                            <TableCell align="center">Issued Date</TableCell>
                                            <TableCell align="center">Period Covered</TableCell>
                                            <TableCell align="center">Verification Status</TableCell>
                                            <TableCell align="center">Active Status</TableCell>
                                            <TableCell align="center">Prev. Transaction</TableCell>
                                            <TableCell align="center">Transaction Hash</TableCell>
                                        </>
                                    )}
                                    {selectedMenu === "emitter" && (
                                        <>
                                            <TableCell align="center">Project Name</TableCell>
                                            <TableCell align="center">Address</TableCell>
                                            <TableCell align="center">Carbon Credit Amount</TableCell>
                                            <TableCell align="center">Date Bought</TableCell>
                                            <TableCell align="center">Verification Status</TableCell>
                                            <TableCell align="center">Active Status</TableCell>
                                            <TableCell align="center">Prev Transaction</TableCell>
                                            <TableCell align="center">Transaction Hash</TableCell>
                                        </>
                                    )}
                                    {selectedMenu === "verifier" && (
                                        <>
                                            <TableCell align="center">Project Name</TableCell>
                                            <TableCell align="center">Verification Date</TableCell>
                                            <TableCell align="center">Verifier Address</TableCell>
                                            <TableCell align="center">Transaction Hash</TableCell>
                                        </>
                                    )}
                                </TableRow>
                            </TableHead>
                            {renderTableContent()}
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
}

export default TransactionPage;