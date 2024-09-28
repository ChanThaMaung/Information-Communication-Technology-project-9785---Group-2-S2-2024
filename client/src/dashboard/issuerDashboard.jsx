import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Label } from 'recharts';
import * as IssuerAPI from '../../../server/API/Issuer/get_by_address_api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment } from '@mui/material';
import { format, formatDistanceToNow } from 'date-fns';
import { shortenAddress } from "../scripts/shortenAddress"; // Add this import

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
    prev_tx: "",
  });

  const [dateRange, setDateRange] = useState([null, null]);

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleDateRangeChange = (update) => {
    setDateRange(update);
    const [start, end] = update;
    const stringValue = start && end
      ? `${start.toLocaleDateString('en-US')} - ${end.toLocaleDateString('en-US')}`
      : '';
    setFormData(prevData => ({
      ...prevData,
      period_covered: stringValue
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formData.issuer_address = currentIssuerAccount;
    console.log("Sending fromdata:", formData);
    handleSubmit(formData);
  };

  const [verifiedCredits, setVerifiedCredits] = useState(0);
  const [retiredCredits, setRetiredCredits] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [yearlyCredits, setYearlyCredits] = useState(0);
  const [yearlyAverage, setYearlyAverage] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
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

        const yearlyAverageData = await IssuerAPI.getYearlyAverage(currentIssuerAccount);
        setYearlyAverage(Number(yearlyAverageData[0].yearly_average));

        const allTransactionsData = await IssuerAPI.getByAddress(currentIssuerAccount);
        setAllTransactions(allTransactionsData);
      } catch (error) {
        console.error("Error fetching issuer data:", error);
        // Handle the error appropriately, e.g., set an error state or show a notification
      }
    };

    fetchData();
  }, [currentIssuerAccount]);

  useEffect(() => {
    const filtered = allTransactions.filter(transaction =>
      transaction.project_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
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

  const formatTransactionData = (transaction) => ({
    ...transaction,
    date_issued: format(new Date(transaction.date_issued), 'yyyy-MM-dd'),
    active_status: transaction.active_status === 0 ? 'Active' : 'Retired',
    time_since: formatDistanceToNow(new Date(transaction.date_issued), { addSuffix: true }),
  });

  const displayedTransactions = allTransactions.slice(0, 4).map(formatTransactionData);

  const cellStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const allFormattedTransactions = allTransactions.map(formatTransactionData);

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
              <div>This year</div>
            </div>
            <div className="issuer-item-data">
              {Number(yearlyCredits).toLocaleString()}
            </div>
            <div className="issuer-item-footer">
              <p style={{
                color: Number(yearlyCredits) > yearlyAverage ? 'green' : 'red',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                {Number(yearlyCredits) !== 0 && (
                  <>
                    <span style={{ fontSize: '0.9em' }}>
                      {Number(yearlyCredits) > yearlyAverage ? '▲' : '▼'}
                    </span>
                    {`${((yearlyCredits / yearlyAverage) * 100).toFixed(2)}%`}
                  </>
                )} (Last Year's)
              </p>
            </div>
          </div>
          <div className="issuer-upper-1-1">
            <div className="issuer-item-header">
              Total credits
            </div>
            <div className="issuer-item-data">
              {Number(totalCredits).toLocaleString()}
            </div>
          </div>
        </div>
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
      <div className="issuer-lower">
        <div className="issuer-lower-header">
          <Button variant="contained" color="primary" onClick={handleOpenCreateDialog}>
            Create New
          </Button>

          <TextField
            placeholder="Search by project name"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: '70%' }}
          />
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table>
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
              <TableBody>
                {(searchTerm ? filteredTransactions : displayedTransactions).map((transaction) => (
                  <TableRow key={transaction.transaction_hash}>
                    <TableCell align="center" style={cellStyle}>{transaction.project_name}</TableCell>
                    <TableCell align="center" style={cellStyle}>{transaction.date_issued}</TableCell>
                    <TableCell align="center" style={cellStyle}>{transaction.credit_amount}</TableCell>
                    <TableCell align="center" style={cellStyle}>{transaction.active_status}</TableCell>
                    <TableCell align="center" style={cellStyle}>{transaction.period_covered}</TableCell>
                    <TableCell align="center" style={cellStyle}>{shortenAddress(transaction.transaction_hash)}</TableCell>
                    <TableCell align="center" style={cellStyle}>{transaction.prev_tx ? shortenAddress(transaction.prev_tx) : "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} onClick={handleOpenDialog}>
          View More
        </Button>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>All Transactions</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Project Name</TableCell>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Date Issued</TableCell>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Credit Amount</TableCell>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Active Status</TableCell>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Period Covered</TableCell>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Transaction Hash</TableCell>
                  <TableCell align="center" style={{ ...cellStyle, fontWeight: 'bold' }}>Previous Transaction</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.transaction_hash}>
                    <TableCell align="center" style={cellStyle}>{transaction.project_name}</TableCell>
                    <TableCell align="center" style={cellStyle}>{transaction.date_issued}</TableCell>
                    <TableCell align="center" style={cellStyle}>{transaction.credit_amount}</TableCell>
                    <TableCell align="center" style={cellStyle}>{transaction.active_status}</TableCell>
                    <TableCell align="center" style={cellStyle}>{transaction.period_covered}</TableCell>
                    <TableCell align="center" style={cellStyle}>{shortenAddress(transaction.transaction_hash)}</TableCell>
                    <TableCell align="center" style={cellStyle}>{transaction.prev_tx ? shortenAddress(transaction.prev_tx) : "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
                className="form-control border border-black p-2 ml-2"
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
                <option value="0">Issued</option>
                <option value="1">Retired</option>
              </select>
            </div>
            <div className="flex items-center">
              <span className="mr-2 w-32">Period Covered:</span>
              <DatePicker
                selectsRange={true}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                onChange={handleDateRangeChange}
                dateFormat="MM/dd/yyyy"
                className="form-control border border-black p-2 ml-2"
                placeholderText="Select date range"
              />
            </div>
            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32"
            >
              Submit
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default issuerDashboard;