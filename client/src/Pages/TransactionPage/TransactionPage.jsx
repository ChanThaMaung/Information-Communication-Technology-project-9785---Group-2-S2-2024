import  { useState, useEffect, useCallback } from "react";
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
    const [filters, setFilters] = useState({
        project_name: '',
        date_issued: '',
        period_covered: '',
        verification_status: '',
        active_status: ''
    });

    const fetchData = useCallback(async () => {
        let data;
        if (selectedMenu === "issuer") {
            data = await issuerAPI.getAllIssuer(filters);
            setAllIssuers(data);
        } else if (selectedMenu === "emitter") {
            data = await emitterAPI.getAllEmitter(filters);
            setAllEmitters(data);
        } else if (selectedMenu === "verifier") {
            data = await verifierAPI.getAllVerifier(filters);
            setAllVerifiers(data);
        }
    }, [selectedMenu, filters]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleMenuChange = (event) => {
        setSelectedMenu(event.target.value);
        setFilters({
            project_name: '',
            date_issued: '',
            period_covered: '',
            verification_status: '',
            active_status: ''
        });
    };

    const handleSearch = () => {
        fetchData();
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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Transactions</h1>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 justify-between items-center mb-4">
                <div className="col-span-1 gap-4 justify-between items-center mb-2">
                    <TextField
                        select
                        variant="outlined"
                        defaultValue="issuer"
                        onChange={handleMenuChange}
                        className="mr-2 w-full max-w-xs bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 py-2 px-3"
                    >
                        <MenuItem value="emitter">Emitter</MenuItem>
                        <MenuItem value="issuer">Issuer</MenuItem>
                        <MenuItem value="verifier">Verifier</MenuItem>
                    </TextField>
                </div>
                <div className="col-span-4 space-x-2 grid grid-cols-7">
                    <TextField
                        variant="outlined"
                        label="Project Name"
                        name="project_name"
                        value={filters.project_name}
                        onChange={handleFilterChange}
                        className="mb-2 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 py-2 px-3"
                    />
                    <TextField
                        variant="outlined"
                        label="Date"
                        name="date_issued"
                        value={filters.date_issued}
                        onChange={handleFilterChange}
                        className="min-w-[150px] mb-2 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <TextField
                        variant="outlined"
                        label="Period Covered"
                        name="period_covered"
                        value={filters.period_covered}
                        onChange={handleFilterChange}
                        className="min-w-[150px] mb-2 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <TextField
                        variant="outlined"
                        label="Verified Status"
                        name="verification_status"
                        value={filters.verification_status}
                        onChange={handleFilterChange}
                        className="min-w-[175px] mb-2 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <TextField
                        variant="outlined"
                        label="Active Status"
                        name="active_status"
                        value={filters.active_status}
                        onChange={handleFilterChange}
                        className="min-w-[175px] mb-2 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SearchIcon />}
                        onClick={handleSearch}
                        className="col-span-2 bg-blue-600 text-white hover:bg-blue-700 mb-2"
                    >
                        Search
                    </Button>
                </div>
            </div>
            <TableContainer component={Paper} className="shadow-lg">
                <Table>
                    <TableHead>
                        <TableRow className="bg-blue-600 text-white">
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
    );
}

export default TransactionPage;