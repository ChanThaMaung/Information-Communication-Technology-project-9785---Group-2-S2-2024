import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Button } from '@mui/material';
import * as issuerAPI from "../../../../server/API/Issuer/get_issuer_api";
import * as emitterAPI from "../../../../server/API/Emitter/get_emitter_api";
import * as verifierAPI from "../../../../server/API/Verifier/get_verifier_api";
import { shortenAddress } from "../../scripts/shortenAddress";
import { formatVerificationStatusSQL, formatActiveStatusSQL } from "../../scripts/formatUtils.js"; // Create this utility function
import './transactionpage.css';
import { Link } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import { countries } from "../../scripts/countryList.js";

const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return {
        value,
        onChange: handleChange,
    };
};

const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    return `${month} ${day}, ${year} ${formattedHours}:${minutes}${ampm}`;
};
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

const formatStatus = (status) => status === 1 ? "Verified" : "Unverified";
const formatActiveStatus = (status) => status === 1 ? "Retired" : "Active";

function TransactionPage() {
    // Set default selectedMenu to "issuer"
    const [selectedMenu, setSelectedMenu] = useState("issuer");
    const [allIssuers, setAllIssuers] = useState([]);
    const [allEmitters, setAllEmitters] = useState([]);
    const [allVerifiers, setAllVerifiers] = useState([]);


    const [filters, setFilters] = useState({});
    const [searchFilters, setSearchFilters] = useState({});

    // Inputs for the filter issuer
    const issuerAddressInputforIssuer = useInput(filters.issuer_address);
    const projectNameInputforIssuer = useInput(filters.project_name);
    const creditAmountInputforIssuer = useInput(filters.credit_amount);
    const dateIssuedInputforIssuer = useInput(filters.date_issued);
    const periodCoveredInputforIssuer = useInput(filters.period_covered);
    const verificationStatusInputforIssuer = useInput(filters.verification_status);
    const activeStatusInputforIssuer = useInput(filters.active_status);
    const countryInputforIssuer = useInput(filters.country);

    // Inputs for the filter emitter
    const emitterAddressInputforEmitter = useInput(filters.emitter_address);
    const projectNameInputforEmitter = useInput(filters.project_name);
    const creditAmountInputforEmitter = useInput(filters.credit_amount);
    const dateBoughtInputforEmitter = useInput(filters.date_bought);

    // Inputs for the filter verifier
    const verifierAddressInputforVerifier = useInput(filters.verifier_address);
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
                    issuer_address: issuerAddressInputforIssuer.value,
                    project_name: projectNameInputforIssuer.value,
                    country: countryInputforIssuer.value,
                    credit_amount: creditAmountInputforIssuer.value,
                    date_issued: dateIssuedInputforIssuer.value,
                    period_covered: periodCoveredInputforIssuer.value,
                    verification_status: formatVerificationStatusSQL(verificationStatusInputforIssuer.value),
                    active_status: formatActiveStatusSQL(activeStatusInputforIssuer.value),
                };
                console.log("Issuer filters:", currentFilters);
                data = await issuerAPI.getAllIssuer(currentFilters);
            } else if (selectedMenu === "emitter") {
                const currentFilters = {
                    emitter_address: emitterAddressInputforEmitter.value,
                    project_name: projectNameInputforEmitter.value,
                    credit_amount: creditAmountInputforEmitter.value,
                    date_bought: dateBoughtInputforEmitter.value,
                };
                console.log("Emitter filters:", currentFilters);
                data = await emitterAPI.getAllEmitter(currentFilters);
            } else if (selectedMenu === "verifier") {
                const currentFilters = {
                    verifier_address: verifierAddressInputforVerifier.value,
                    project_name: projectNameInputforVerifier.value,
                    verification_date: (verificationDateInputforVerifier.value),
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
        if (selectedMenu === "issuer") {
            setFilters({
                issuer_address: '',
                project_name: '',
                country: '',
                credit_amount: '',
                date_issued: '',
                period_covered: '',
                verification_status: '',
                active_status: '',
            });
            issuerAddressInputforIssuer.onChange({ target: { value: '' } });
            projectNameInputforIssuer.onChange({ target: { value: '' } });
            countryInputforIssuer.onChange({ target: { value: '' } });
            creditAmountInputforIssuer.onChange({ target: { value: '' } });
            dateIssuedInputforIssuer.onChange({ target: { value: '' } });
            periodCoveredInputforIssuer.onChange({ target: { value: '' } });
            verificationStatusInputforIssuer.onChange({ target: { value: '' } });
            activeStatusInputforIssuer.onChange({ target: { value: '' } });
        } else if (selectedMenu === "emitter") {
            setFilters({
                emitter_address: '',
                project_name: '',
                credit_amount: '',
                date_bought: '',
            });
            emitterAddressInputforEmitter.onChange({ target: { value: '' } });
            projectNameInputforEmitter.onChange({ target: { value: '' } });
            creditAmountInputforEmitter.onChange({ target: { value: '' } });
            dateBoughtInputforEmitter.onChange({ target: { value: '' } });
        } else if (selectedMenu === "verifier") {
            setFilters({
                verifier_address: '',
                project_name: '',
                verification_date: '',
            });
            verifierAddressInputforVerifier.onChange({ target: { value: '' } });
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
                issuer_address: '',
                project_name: '',
                country: '',
                credit_amount: '',
                date_issued: '',
                period_covered: '',
                verification_status: '',
                active_status: '',
                transaction_hash: '',
            });
        } else if (newMenu === "emitter") {
            setFilters({
                emitter_address: '',
                project_name: '',
                credit_amount: '',
                date_bought: '',
            });
        } else if (newMenu === "verifier") {
            setFilters({
                verifier_address: '',
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
                            label="Issuer Address"
                            name="issuer_address"
                            value={issuerAddressInputforIssuer.value}
                            onChange={(e) => {
                                issuerAddressInputforIssuer.onChange(e);
                                handleFilterChange('issuer_address', e.target.value);
                            }}
                        />

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
                        <Autocomplete
                            options={countries}
                            value={countryInputforIssuer.value}
                            onChange={(event, newValue) => {
                                countryInputforIssuer.onChange({ target: { value: newValue } });
                                handleFilterChange('country', newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Country"
                                    name="country"
                                    className="col-span-1 bg-white rounded-md shadow-sm"
                                />
                            )}
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
                            label="Date Issued"
                            name="date_issued"
                            type="date"
                            value={dateIssuedInputforIssuer.value}
                            onChange={(e) => {
                                dateIssuedInputforIssuer.onChange(e);
                                handleFilterChange('date_issued', e.target.value);
                            }}
                            InputLabelProps={{
                                shrink: true,
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
                            label="Active Status"
                            name="active_status"
                            value={activeStatusInputforIssuer.value}
                            onChange={(e) => {
                                activeStatusInputforIssuer.onChange(e);
                                handleFilterChange('active_status', e.target.value);
                            }}
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="retired">Retired</MenuItem>
                        </TextField>
                    </>
                )
            case "emitter":
                return (
                    <>
                        <TextField
                            variant="outlined"
                            label="Emitter Address"
                            name="emitter_address"
                            value={emitterAddressInputforEmitter.value}
                            onChange={(e) => {
                                emitterAddressInputforEmitter.onChange(e);
                                handleFilterChange('emitter_address', e.target.value);
                            }}
                        />

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
                            type="date"
                            value={dateBoughtInputforEmitter.value}
                            onChange={(e) => {
                                dateBoughtInputforEmitter.onChange(e);
                                handleFilterChange('date_bought', e.target.value);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}

                        />
                    </>
                )
            case "verifier":
                return (
                    <>
                        <TextField
                            variant="outlined"
                            label="Verifier Address"
                            name="verifier_address"
                            value={verifierAddressInputforVerifier.value}
                            onChange={(e) => {
                                verifierAddressInputforVerifier.onChange(e);
                                handleFilterChange('verifier_address', e.target.value);
                            }}
                        />
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
                            type="date"
                            value={verificationDateInputforVerifier.value}
                            onChange={(e) => {
                                verificationDateInputforVerifier.onChange(e);
                                handleFilterChange('verification_date', e.target.value);
                            }}
                            InputLabelProps={{
                                shrink: true,
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
                                <TableCell align="center">
                                    <a href={`https://explorer.example.com/address/${transaction.issuer_address}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                        {shortenAddress(transaction.issuer_address)}
                                    </a>
                                </TableCell>
                                <TableCell>{transaction.project_name}</TableCell>
                                <TableCell>{transaction.country}</TableCell>
                                <TableCell align="center">{transaction.credit_amount}</TableCell>
                                <TableCell align="center">{formatDate(transaction.date_issued)}</TableCell>
                                <TableCell align="center">{transaction.period_covered}</TableCell>
                                <TableCell align="center">{formatStatus(transaction.verification_status)}</TableCell>
                                <TableCell align="center">{formatActiveStatus(transaction.active_status)}</TableCell>
                                <TableCell align="center">
                                    {transaction.prev_tx && transaction.prev_tx !== "N/A" ? (
                                        <a
                                            href={`https://explorer.example.com/tx/${transaction.prev_tx}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: 'blue', textDecoration: 'underline' }}
                                        >
                                            {shortenAddress(transaction.prev_tx)}
                                        </a>
                                    ) : (
                                        <span style={{ color: 'inherit' }}>
                                            {transaction.prev_tx === "N/A" ? "N/A" : "No previous transaction"}
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    <a href={`https://explorer.example.com/tx/${transaction.transaction_hash}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                        {shortenAddress(transaction.transaction_hash)}
                                    </a>
                                </TableCell>
                                <TableCell align="center">{formatDateAndTime(transaction.timestamp)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                );
            case "emitter":
                return (
                    <TableBody>
                        {allEmitters.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">
                                    <a href={`https://explorer.example.com/address/${transaction.emitter_address}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                        {shortenAddress(transaction.emitter_address)}
                                    </a>
                                </TableCell>
                                <TableCell align="center">{transaction.project_name}</TableCell>

                                <TableCell align="center">{transaction.credit_amount}</TableCell>
                                <TableCell align="center">{formatDate(transaction.date_bought)}</TableCell>
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
                                <TableCell align="center">
                                    <a href={`https://explorer.example.com/address/${transaction.verifier_address}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                        {shortenAddress(transaction.verifier_address)}
                                    </a>
                                </TableCell>
                                <TableCell align="center">{transaction.project_name}</TableCell>
                                <TableCell align="center">{formatDate(transaction.verification_date)}</TableCell>
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
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="header text-3xl font-bold text-center mb-6">All Transactions</h1>
            <Link to="/dashboard" className="dashboard-button absolute top-6 right-6">
                <button className="bg--gradientCarousel bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Go to dashboard
                </button>
            </Link>
            <div className="grid grid-cols-7 gap-4 justify-between items-center mb-4 filter-container">
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
                {/* <div className="filter-container"> */}
                {handleMenuFilterContent()}
                {/* </div> */}
                {/* Add Search Button */}
                <Button variant="contained" color="primary" onClick={handleSearchClick}>
                    Search
                </Button>
                {/* Add Reset Filters Button */}
                <Button variant="outlined" color="secondary" onClick={resetFilters}>
                    Reset Filters
                </Button>
            </div>
            <TableContainer component={Paper} className="shadow-lg">
                <Table>
                    <TableHead>
                        <TableRow className="bg-blue-600 text-white">
                            {selectedMenu === "issuer" && (
                                <>
                                    <TableCell align="center">Issuer Address</TableCell>
                                    <TableCell align="center">Project Name</TableCell>
                                    <TableCell align="center">Country</TableCell>
                                    <TableCell align="center">Credit Amount</TableCell>
                                    <TableCell align="center">Issued Date</TableCell>
                                    <TableCell align="center">Period Covered</TableCell>
                                    <TableCell align="center">Verification Status</TableCell>
                                    <TableCell align="center">Active Status</TableCell>
                                    <TableCell align="center">Prev. Transaction</TableCell>
                                    <TableCell align="center">Transaction Hash</TableCell>
                                    <TableCell align="center">Timestamp</TableCell>
                                </>
                            )}
                            {selectedMenu === "emitter" && (
                                <>
                                    <TableCell align="center">Emitter Address</TableCell>
                                    <TableCell align="center">Project Bought</TableCell>
                                    <TableCell align="center">Credit Amount</TableCell>
                                    <TableCell align="center">Date Bought</TableCell>
                                    {/* <TableCell align="center">Verification Status</TableCell>
                                    <TableCell align="center">Active Status</TableCell> */}
                                    <TableCell align="center">Transaction Hash</TableCell>
                                </>
                            )}
                            {selectedMenu === "verifier" && (
                                <>
                                    <TableCell align="center">Verifier Address</TableCell>
                                    <TableCell align="center">Project Name</TableCell>
                                    <TableCell align="center">Verification Date</TableCell>
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