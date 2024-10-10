import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Button } from '@mui/material';
// import FilterListIcon from '@mui/icons-material/FilterList'; IconButton
// import SortIcon from '@mui/icons-material/Sort';
// import SearchIcon from '@mui/icons-material/Search';
import * as issuerAPI from "../../../../server/API/Issuer/get_issuer_api";
import * as emitterAPI from "../../../../server/API/Emitter/get_emitter_api";
import * as verifierAPI from "../../../../server/API/Verifier/get_verifier_api";
import { shortenAddress } from "../../scripts/shortenAddress";
import useInput from "../../Hooks/useInput";
import { formatDateForSQL, formatDateForSQLv2, formatVerificationStatusSQL, formatActiveStatusSQL } from "../../utils/formatUtils.js"; // Create this utility function


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
    // Set default selectedMenu to "issuer"
    const [selectedMenu, setSelectedMenu] = useState("issuer");
    const [allIssuers, setAllIssuers] = useState([]);
    const [allEmitters, setAllEmitters] = useState([]);
    const [allVerifiers, setAllVerifiers] = useState([]);

    // Initial filters state
    const initialFilters = {
        project_name: '',
        credit_amount: '',
        date_issued: '',
        period_covered: '',
        transaction_hash: '',
    };

    const [filters, setFilters] = useState(initialFilters);
    const [searchFilters, setSearchFilters] = useState(initialFilters);

    // Inputs for the filter issuer
    const projectNameInputforIssuer = useInput(filters.project_name);
    const creditAmountInputforIssuer = useInput(filters.credit_amount);
    const dateIssuedInputforIssuer = useInput(filters.date_issued);
    const periodCoveredInputforIssuer = useInput(filters.period_covered);
    const transactionHashInputforIssuer = useInput(filters.transaction_hash);
    const verificationStatusInputforIssuer = useInput(filters.verification_status);
    const activeStatusInputforIssuer = useInput(filters.active_status);

    // Inputs for the filter emitter
    const projectNameInputforEmitter = useInput(filters.project_name);
    const creditAmountInputforEmitter = useInput(filters.credit_amount);
    const dateBoughtInputforEmitter = useInput(filters.date_bought);

    // Inputs for the filter verifier
    const projectNameInputforVerifier = useInput(filters.project_name);
    const verificationDateInputforVerifier = useInput(filters.verification_date);

    useEffect(() => {
        fetchData();
    }, [selectedMenu, filters]); // Fetch data when filters change

    const fetchData = async () => {
        let data;
        try {
            if (selectedMenu === "issuer") {
                const currentFilters = {
                    project_name: projectNameInputforIssuer.value,
                    credit_amount: creditAmountInputforIssuer.value,
                    date_issued: formatDateForSQL(dateIssuedInputforIssuer.value),
                    period_covered: periodCoveredInputforIssuer.value,
                    verification_status: formatVerificationStatusSQL(verificationStatusInputforIssuer.value),
                    active_status: formatActiveStatusSQL(activeStatusInputforIssuer.value),
                };
                console.log("Issuer filters:", currentFilters);
                data = await issuerAPI.getAllIssuer(currentFilters);
            } else if (selectedMenu === "emitter") {
                const currentFilters = {
                    project_name: projectNameInputforEmitter.value,
                    credit_amount: creditAmountInputforEmitter.value,
                    date_bought: formatDateForSQL(dateBoughtInputforEmitter.value),
                };
                console.log("Emitter filters:", currentFilters);
                data = await emitterAPI.getAllEmitter(currentFilters);
            } else if (selectedMenu === "verifier") {
                const currentFilters = {
                    project_name: projectNameInputforVerifier.value,
                    verification_date: formatDateForSQLv2(verificationDateInputforVerifier.value),
                };
                console.log("Verifier filters:", currentFilters);
                data = await verifierAPI.getAllVerifier(currentFilters);
            }
            console.log("Fetched data:", data); // Debugging line

            if (selectedMenu === "issuer") {
                setAllIssuers(data);
            } else if (selectedMenu === "emitter") {
                setAllEmitters(data);
            } else if (selectedMenu === "verifier") {
                setAllVerifiers(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error); // Error handling
        }
    }

    // Update the filters state when the input changes
    const handleFilterChange = (name, value) => {
        setSearchFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // New function to handle search button click
    const handleSearchClick = () => {
        setFilters(searchFilters); // Update filters to the search filters
        fetchData(); // Fetch data based on the updated filters
    };

    // Function to reset filters based on selected menu
    const resetFilters = () => {
        const resetValues = {
            issuer: {
                project_name: '',
                credit_amount: '',
                date_issued: '',
                period_covered: '',
                transaction_hash: '',
                verification_status: '',
                active_status: '',
            },
            emitter: {
                project_name: '',
                credit_amount: '',
                date_bought: '',
            },
            verifier: {
                project_name: '',
                verification_date: '',
            },
        };
        setFilters(resetValues[selectedMenu]);
        // Reset input values
        if (selectedMenu === "issuer") {
            projectNameInputforIssuer.onChange({ target: { value: '' } });
            creditAmountInputforIssuer.onChange({ target: { value: '' } });
            dateIssuedInputforIssuer.onChange({ target: { value: '' } });
            periodCoveredInputforIssuer.onChange({ target: { value: '' } });
            transactionHashInputforIssuer.onChange({ target: { value: '' } });
            verificationStatusInputforIssuer.onChange({ target: { value: '' } });
            activeStatusInputforIssuer.onChange({ target: { value: '' } });
        } else if (selectedMenu === "emitter") {
            projectNameInputforEmitter.onChange({ target: { value: '' } });
            creditAmountInputforEmitter.onChange({ target: { value: '' } });
            dateBoughtInputforEmitter.onChange({ target: { value: '' } });
        } else if (selectedMenu === "verifier") {
            projectNameInputforVerifier.onChange({ target: { value: '' } });
            verificationDateInputforVerifier.onChange({ target: { value: '' } });
        }
        fetchData();
    };

    const handleMenuChange = (event) => {
        const newMenu = event.target.value; // Store the new menu value
        setSelectedMenu(newMenu);
        
        // Reset filters based on selected menu
        if (newMenu === "issuer") {
            setFilters({
                project_name: '',
                credit_amount: '',
                date_issued: '',
                period_covered: '',
                verification_status: '',
                active_status: '',
                transaction_hash: '',
            });
        } else if (newMenu === "emitter") {
            setFilters({
                project_name: '',
                credit_amount: '',
                date_bought: '',
            });
        } else if (newMenu === "verifier") {
            setFilters({
                project_name: '',
                verification_date: '',
            });
        }
    };

    const handleMenuFilterContent = () => {
        switch (selectedMenu) {
            case "issuer":
                return (
                    <>
                        <TextField
                            variant="outlined"
                            label="Project Name"
                            name="project_name"
                            value={projectNameInputforIssuer.value}
                            onChange={(e) => {
                                projectNameInputforIssuer.onChange(e);
                                handleFilterChange('project_name', e.target.value);
                            }}
                            className="col-span-1 bg-white rounded-md shadow-sm" // Tailwind classes
                        />
                        <TextField
                            variant="outlined"
                            label="Credit Amount"
                            name="credit_amount"
                            value={creditAmountInputforIssuer.value}
                            onChange={(e) => {
                                creditAmountInputforIssuer.onChange(e);
                                handleFilterChange('credit_amount', e.target.value);
                            }}
                            className="min-w-[150px] bg-white rounded-md shadow-sm" // Tailwind classes
                        />
                        <TextField
                            variant="outlined"
                            label="Date"
                            name="date_issued"
                            value={dateIssuedInputforIssuer.value}
                            onChange={(e) => {
                                dateIssuedInputforIssuer.onChange(e);
                                handleFilterChange('date_issued', e.target.value);
                            }}
                            className="min-w-[150px] mb-2 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <TextField
                            variant="outlined"
                            label="Period Covered"
                            name="period_covered"
                            value={periodCoveredInputforIssuer.value}
                            onChange={(e) => {
                                periodCoveredInputforIssuer.onChange(e);
                                handleFilterChange('period_covered', e.target.value);
                            }}
                            className="min-w-[150px] mb-2 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <TextField
                            select
                            variant="outlined"
                            label="Verification Status"
                            name="verification_status"
                            value={verificationStatusInputforIssuer.value}
                            onChange={(e) => {
                                verificationStatusInputforIssuer.onChange(e);
                                handleFilterChange('verification_status', e.target.value);
                            }}
                            className="bg-white rounded-md shadow-sm"
                        >
                            <MenuItem value="verified">Verified</MenuItem>
                            <MenuItem value="unverified">Unverified</MenuItem>
                        </TextField>
                        <TextField
                            select
                            variant="outlined"
                            label="Active Status" // Fixed missing label
                            name="active_status"
                            value={activeStatusInputforIssuer.value}
                            onChange={(e) => {
                                activeStatusInputforIssuer.onChange(e);
                                handleFilterChange('active_status', e.target.value);
                            }}
                            className="bg-white rounded-md shadow-sm"
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="retired">Retired</MenuItem>
                        </TextField>
                        <TextField
                            variant="outlined"
                            label="Transaction Hash"
                            name="transaction_hash"
                            value={transactionHashInputforIssuer.value}
                            onChange={(e) => {
                                transactionHashInputforIssuer.onChange(e);
                                handleFilterChange('transaction_hash', e.target.value);
                            }}
                            className="bg-white rounded-md shadow-sm"
                        />
                    </>
                )
            case "emitter":
                return (
                    <>
                        <TextField
                            variant="outlined"
                            label="Project Name"
                            name="project_name"
                            value={projectNameInputforEmitter.value}
                            onChange={(e) => {
                                projectNameInputforEmitter.onChange(e);
                                handleFilterChange('project_name', e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Credit Amount"
                            name="credit_amount"
                            value={creditAmountInputforEmitter.value}
                            onChange={(e) => {
                                creditAmountInputforEmitter.onChange(e);
                                handleFilterChange('credit_amount', e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Date Bought"
                            name="date_bought"
                            value={dateBoughtInputforEmitter.value}
                            onChange={(e) => {
                                dateBoughtInputforEmitter.onChange(e);
                                handleFilterChange('date_bought', e.target.value);
                            }}
                        />
                    </>
                )
            case "verifier":
                return (
                    <>
                        <TextField
                            variant="outlined"
                            label="Project Name"
                            name="project_name"
                            value={projectNameInputforVerifier.value}
                            onChange={(e) => {
                                projectNameInputforVerifier.onChange(e);
                                handleFilterChange('project_name', e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Verification Date"
                            name="verification_date"
                            value={verificationDateInputforVerifier.value}
                            onChange={(e) => {
                                verificationDateInputforVerifier.onChange(e);
                                handleFilterChange('verification_date', e.target.value);
                            }}
                        />
                    </>
                );
            default:
                return null;
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
        <div className="container mx-auto p-4 md:p-6 bg-gray-100 min-h-screen"> {/* Adjusted padding for mobile and tablet */}
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">Transactions</h1> {/* Responsive text size */}
            <div className="grid grid-cols-1 md:grid-cols-10 gap-4 justify-between items-center mb-4"> {/* Responsive grid layout */}
                <TextField
                    select
                    variant="outlined"
                    defaultValue="issuer"
                    onChange={handleMenuChange}
                    className="bg-white rounded-md shadow-sm col-span-1" // Tailwind classes
                >
                    <MenuItem value="emitter">Emitter</MenuItem>
                    <MenuItem value="issuer">Issuer</MenuItem>
                    <MenuItem value="verifier">Verifier</MenuItem>
                </TextField>
                {handleMenuFilterContent()}
                <Button variant="contained" color="primary" onClick={handleSearchClick} className="w-full md:w-auto"> {/* Full width on mobile */}
                    Search
                </Button>
                <Button variant="outlined" color="secondary" onClick={resetFilters} className="w-full md:w-auto"> {/* Full width on mobile */}
                    Reset Filters
                </Button>
            </div>
            <TableContainer component={Paper} className="shadow-lg overflow-x-auto"> {/* Added overflow for responsiveness */}
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