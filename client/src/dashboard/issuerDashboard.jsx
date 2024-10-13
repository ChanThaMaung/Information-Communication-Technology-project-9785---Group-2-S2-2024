import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Label } from 'recharts';
import * as IssuerAPI from '../../../server/API/Issuer/get_by_address_api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment, Autocomplete } from '@mui/material';
import { format, formatDistanceToNow } from 'date-fns';
import { shortenAddress } from "../scripts/shortenAddress"; // Add this import
import './css_files/issuerDashboard.css';
import { countries } from "../scripts/countryList";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import CircularProgress from '@mui/material/CircularProgress';
import { shortenName } from "../scripts/shortenName";
function issuerDashboard({
  handleSubmit,
  formatDate,
  currentIssuerAccount,
}) {
  const [formData, setFormData] = useState({
    issuer_address: "",
    project_name: "",
    credit_amount: "",
    date_issued: 0,
    active_status: "",
    period_covered: "",
    verification_status: "0",
    country: "",
    bought_by: "N/A",
    prev_tx: "N/A",
  });

  const [formErrors, setFormErrors] = useState({});
  const [dateRange, setDateRange] = useState([null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = async (e, field) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'project_name') {
      // Clear the error as soon as the user starts typing
      setFormErrors(prev => ({ ...prev, project_name: '' }));

      if (value.trim() !== '') {
        const exists = await IssuerAPI.checkProjectNameExists(value);
        if (exists) {
          setFormErrors(prev => ({ ...prev, project_name: 'This project name already exists' }));
        }
      }
    }
  };

  const handleDateRangeChange = (newValue) => {
    setDateRange(newValue);
    const [start, end] = newValue;
    const stringValue = start && end
      ? `${start.format('MM/DD/YYYY')} - ${end.format('MM/DD/YYYY')}`
      : '';
    setFormData(prevData => ({
      ...prevData,
      period_covered: stringValue
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    formData.issuer_address = currentIssuerAccount;
    console.log("Sending formdata:", formData);
    if (formErrors.project_name === '') {
      setIsSubmitting(true);
      try {
        await handleSubmit(formData);
        handleCloseCreateDialog();
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error (e.g., show error message)
      } finally {
        setIsSubmitting(false);
      }
    }
    else {
      alert("Project already exists!");      
    }
  };

  const [verifiedCredits, setVerifiedCredits] = useState(0);
  const [retiredCredits, setRetiredCredits] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [yearlyCredits, setYearlyCredits] = useState(0);
  const [lastYearCredits, setLastYearCredits] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const verifiedCreditsData = await IssuerAPI.getVerifiedCredits(currentIssuerAccount);
        setVerifiedCredits(Number(verifiedCreditsData[0].credits_issued));

        const retiredCreditsData = await IssuerAPI.getRetiredCredits(currentIssuerAccount);
        setRetiredCredits(Number(retiredCreditsData[0].credits_retired));

        const totalCreditsData = await IssuerAPI.getTotalCredits(currentIssuerAccount);
        setTotalCredits(Number(totalCreditsData[0].total_credits));

        const yearlyCreditsData = await IssuerAPI.getYearlyCredits(currentIssuerAccount);
        setYearlyCredits(Number(yearlyCreditsData[0].yearly_credits));

        const lastYearCreditsData = await IssuerAPI.getLastYearCredits(currentIssuerAccount);
        setLastYearCredits(Number(lastYearCreditsData[0].last_year_credits));

        const allTransactionsData = await IssuerAPI.getByAddress(currentIssuerAccount);
        setAllTransactions(allTransactionsData);
      } catch (error) {
        console.error("Error fetching issuer data:", error);
        // Handle the error appropriately, e.g., set an error state or show a notification
      }
    };

    fetchData();
  }, [allTransactions]);

  useEffect(() => {
    const filtered = allTransactions.filter(transaction =>
      transaction.project_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
    filteredTransactions.map(transaction => ({
      ...transaction,
      active_status: transaction.active_status === 0 ? "Active" : "Retired"
    }))
  }, [searchTerm, allTransactions]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addMinimumValue = (data) => {
    return data.map(item => ({
      ...item,
      value: Math.max(item.value, 0.1) // Ensure a minimum value of 0.1
    }));
  };

  const retiredData = addMinimumValue([
    { name: 'Retired', value: retiredCredits },
    { name: 'Active', value: totalCredits - retiredCredits },
  ]);

  const verifiedData = addMinimumValue([
    { name: 'Verified', value: verifiedCredits },
    { name: 'Unverified', value: totalCredits - verifiedCredits },
  ]);

  const COLORS = ['#38812F', '#BDE2B9'];
  const COLORS2 = ['#06C', '#8BC1F7'];

  const cellStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  return (
    <div className="Dashboard">
      <div className="issuer-header">
        <p>Your Data Dashboard</p>
      </div>
      <div className="issuer-upper">
        <div className="issuer-upper-1">
          <div className="issuer-upper-1-1" style={{ marginBottom: '1.5rem' }}>
            <div className="issuer-item-header">
              <div>Credits Issued This year</div>
            </div>
            <div className="issuer-item-data">
              {Number(yearlyCredits).toLocaleString()}
            </div>
            <div className="issuer-item-footer">
              <p style={{
                color: Number(yearlyCredits) >= lastYearCredits ? 'green' : 'red',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                {Number(yearlyCredits) !== 0 && (
                  <>
                    <span style={{ fontSize: '0.9em' }}>
                      {Number(yearlyCredits) >= lastYearCredits ? '▲' : '▼'}
                    </span>
                    <span style={{ fontSize: '0.9rem' }}>
                      {`${((yearlyCredits / lastYearCredits) * 100).toFixed(2)}% (Last Year)`}
                    </span>
                  </>
                )}
              </p>
            </div>

          </div>
          <div className="issuer-upper-1-1">
            <div className="issuer-item-header">
              Total Credits Issued
            </div>
            <div className="issuer-item-data">
              {Number(totalCredits).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="issuer-upper-wrapper">
          <div className="issuer-upper-2">
            <div className="issuer-item-header">
              Retired Credits
            </div>
            <div className="issuer-piechart">
              <div style={{ width: "75%", height: "300px" }}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={retiredData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {retiredData.map((entry, index) => (
                        <Cell style={{ outline: 'none' }} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                      <Label
                        position="center"
                        content={({ viewBox: { cx, cy } }) => (
                          <text x={cx} y={cy} fill="#3d405c" className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
                            <tspan alignmentBaseline="middle" className="bold-number">{retiredCredits.toLocaleString()}</tspan>
                            <tspan fontSize="14" x={cx} dy="1.5em">Retired</tspan>
                          </text>
                        )}
                      />
                    </Pie>
                    <Tooltip />
                    {/* <Legend /> */}
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="issuer-upper-3">
            <div className="issuer-item-header">
              Verified Credits
            </div>
            <div className="issuer-piechart">
              <div style={{ width: "75%", height: "300px" }}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={verifiedData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {verifiedData.map((entry, index) => (
                        <Cell style={{ outline: 'none' }} key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                      ))}
                      <Label
                        position="center"
                        content={({ viewBox: { cx, cy } }) => (
                          <text x={cx} y={cy} fill="#3d405c" className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
                            <tspan alignmentBaseline="middle" className="bold-number">{verifiedCredits.toLocaleString()}</tspan>
                            <tspan fontSize="14" x={cx} dy="1.5em">Verified</tspan>
                          </text>
                        )}
                      />
                    </Pie>
                    <Tooltip />
                    {/* <Legend /> */}
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="issuer-lower">
        <div className="issuer-lower-header">
          <Button className="issuer-lower-button" variant="contained" color="primary" onClick={handleOpenCreateDialog}>
            Create New
          </Button>

          <TextField
            placeholder="Search by project name"
            variant="outlined"
            size="small"
            className="issuer-lower-search"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: '70%' }}
          />
        </div>
        <div style={{ height: '300px', overflow: 'auto', width: '100%' }}>
          <TableContainer component={Paper} style={{ width: '100%', overflowX: "initial" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Project Name</TableCell>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Date Issued</TableCell>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Credit Amount</TableCell>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Active Status</TableCell>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Period Covered</TableCell>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Transaction Hash</TableCell>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Previous Hash</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ backgroundColor: 'white' }}>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.transaction_hash}>
                      <TableCell align="center" style={{ ...cellStyle, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{shortenName(transaction.project_name)}</TableCell>
                      <TableCell align="center" style={{ ...cellStyle }}>{formatDate(transaction.date_issued)}</TableCell>
                      <TableCell align="center" style={{ ...cellStyle }}>{transaction.credit_amount}</TableCell>
                      <TableCell align="center" style={{ ...cellStyle }}>{transaction.active_status === 0 ? 'Active' : 'Retired'}</TableCell>
                      <TableCell align="center" style={{ ...cellStyle, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{transaction.period_covered}</TableCell>
                      <TableCell align="center" style={{ ...cellStyle }}>
                        <a href={`https://etherscan.io/tx/${transaction.transaction_hash}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                          {shortenAddress(transaction.transaction_hash)}
                        </a>
                      </TableCell>
                      <TableCell align="center" style={{ ...cellStyle }}>
                        {transaction.prev_tx && transaction.prev_tx !== "N/A" ? (
                          <a href={`https://etherscan.io/tx/${transaction.prev_tx}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                            {shortenAddress(transaction.prev_tx)}
                          </a>
                        ) : (
                          <span>N/A</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" style={{ ...cellStyle }}>
                      No Transactions Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* New Create Dialog */}
      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog} maxWidth="md" fullWidth>
        <DialogTitle>Create New Transaction</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <div className="flex items-center">
              <span className="mr-2 w-32">Project Name:</span>
              <input
                name="project_name"
                type="text"
                value={formData.project_name}
                onChange={(e) => handleChange(e, "project_name")}
                className={`form-control border ${formErrors.project_name ? 'border-red-500' : 'border-black'} p-2 ml-2`}
              />
            </div>
            <div className="flex items-center">
              <span className="mr-2 w-32">Carbon Credit Amount:</span>
              <input
                name="credit_amount"
                type="number"
                value={formData.credit_amount}
                onChange={(e) => handleChange(e, "credit_amount")}
                className="form-control border border-black p-2 ml-2"
              />
            </div>
            <div className="flex items-center">
              <span className="mr-2 w-32">Date Issued:</span>
              <input
                name="date_issued"
                type="date"
                onChange={(e) => handleChange(e, "date_issued")}
                className="form-control border border-black p-2 ml-2"
              />
            </div>
            <div className="flex items-center">
              <span className="mr-2 w-32">Active Status:</span>
              <select
                name="active_status"
                value={formData.active_status}
                onChange={(e) => handleChange(e, "active_status")}
                className="form-control border border-black p-2 ml-2"
              >
                <option value="">Select Status</option>
                <option value="0">Active</option>
                <option value="1">Retired</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="mr-2 w-32">Country:</span>
              <Autocomplete
                options={countries}
                value={formData.country}
                onChange={(event, newValue) => {
                  handleChange({ target: { value: newValue } }, "country");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    className="form-control border border-black ml-2"
                    style={{ width: '200px' }}
                  />
                )}
              />
            </div>

            <div className="flex items-center">
              <span className="mr-2 w-32">Period Covered:</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <SingleInputDateRangeField
                  label="Start - End"
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  className="form-control border border-black ml-2"
                  slotProps={{
                    textField: { size: 'small' },
                  }}
                />
              </LocalizationProvider>
            </div>
            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default issuerDashboard;