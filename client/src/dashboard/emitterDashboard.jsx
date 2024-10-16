import React, { useState, useEffect, useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { shortenAddress } from "../scripts/shortenAddress";
import * as getByAddressAPI from "../../../server/api/Emitter/get_by_address_api";
import './css_files/emitterDashboard.css';
import { getTotalCreditsActiveAndVerified, getActiveAndVerifiedRows } from "../../../server/API/Issuer/get_issuer_api";
import { shortenName } from "../scripts/shortenName";

function emitterDashboard({
  handleSubmit,
  formatDate,
  currentEmitterAccount,
}) {

  const [totalCredits, setTotalCredits] = useState(0);
  const [creditsByYear, setCreditsByYear] = useState([]);
  const [yearlyTransactions, setYearlyTransactions] = useState([]);
  const [yearlyAverage, setYearlyAverage] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);

  const [activeAndVerifiedRows, setActiveAndVerifiedRows] = useState([]);
  const [totalCreditsActiveAndVerified, setTotalCreditsActiveAndVerified] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);

  const [projectSearchTerm, setProjectSearchTerm] = useState('');

  const [isPurchasing, setIsPurchasing] = useState(false);

  const handleProjectSearchChange = (event) => {
    setProjectSearchTerm(event.target.value);
  };

  const handleRowClick = (project) => {
    setSelectedProject(project);
    setOpenProjectDialog(true);
  };

  const handleCloseProjectDialog = () => {
    setOpenProjectDialog(false);
  };

  const refreshTransactions = async () => {
    await Promise.all([
      getTotalTransactions(),
      getTotalCredits(),
      getCreditsByYear(),
      getYearlyTransactions(),
      getYearlyAverage(),
      getActiveandVerified()
    ]);
  };

  const handleBuyProject = async () => {
    if (selectedProject) {
      setIsPurchasing(true);
      try {
        await onSubmit({ preventDefault: () => { } });
        // The dialog will be closed here, after the submission is complete
        handleCloseProjectDialog();
      } catch (error) {
        console.error("Error purchasing credits:", error);
        // Optionally, show an error message to the user
      } finally {
        setIsPurchasing(false);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    selectedProject.bought_by = currentEmitterAccount;
    selectedProject.prev_tx = selectedProject.transaction_hash;
    console.log("Buying project:", selectedProject);
    try {
      await handleSubmit(selectedProject);
      await refreshTransactions(); // Refresh all data after successful submission
    } catch (error) {
      console.error("Error submitting project:", error);
      // Handle the error appropriately, e.g., show an error message to the user
      throw error; // Re-throw the error so handleBuyProject can catch it
    }
  };

  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const getTotalCredits = async () => {
    const response = await getByAddressAPI.getTotalCredits(currentEmitterAccount);
    if (response[0].total_credits) {
      setTotalCredits(response[0].total_credits);
    }
    else {
      setTotalCredits(0);
    }
  }

  const getCreditsByYear = async () => {
    const response = await getByAddressAPI.getCreditsByYear(currentEmitterAccount);
    if (response[0].total_credits) {
      setCreditsByYear(response[0].total_credits);
    }
    else {
      setCreditsByYear(0);
    }
  }

  const getYearlyTransactions = async () => {
    const response = await getByAddressAPI.getByAddress(currentEmitterAccount);
    setYearlyTransactions(response);
  }

  useEffect(() => {
    getTotalTransactions();
    getTotalCredits();
    getCreditsByYear();
    getYearlyTransactions();
    getYearlyAverage();
    getActiveandVerified();

  }, [currentEmitterAccount]);

  const getActiveandVerified = async () => {
    const response = await getTotalCreditsActiveAndVerified();
    setTotalCreditsActiveAndVerified(response[0].total_credits);

    const response2 = await getActiveAndVerifiedRows();
    setActiveAndVerifiedRows(response2);
  }

  const getYearlyAverage = async () => {
    const response = await getByAddressAPI.getYearlyAverage(currentEmitterAccount);
    if (response[0].yearly_average) {
      setYearlyAverage(response[0].yearly_average);
    }
    else {
      setYearlyAverage(0);
    }
  }

  const chartData = useMemo(() => {
    return yearlyTransactions.map(transaction => ({
      credit_amount: transaction.credit_amount,
      date_bought: formatDate(transaction.date_bought)
    }));
  }, [yearlyTransactions, formatDate]);

  const getTotalTransactions = async () => {
    const response = await getByAddressAPI.getTotalTransactions(currentEmitterAccount);
    setAllTransactions(response);
  }

  const COLORS = ['#06C', '#8BC1F7'];

  const displayedTransactions = showAllTransactions ? allTransactions : allTransactions.slice(0, 4);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  useEffect(() => {
    const filtered = allTransactions.filter(transaction =>
      transaction.project_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [searchTerm, allTransactions]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const transactionsToDisplay = searchTerm
    ? (showAllTransactions ? filteredTransactions : filteredTransactions.slice(0, 4))
    : (showAllTransactions ? allTransactions : allTransactions.slice(0, 4));

  const [openAllProjectsDialog, setOpenAllProjectsDialog] = useState(false);

  const handleOpenAllProjectsDialog = () => {
    setOpenAllProjectsDialog(true);
  };

  const handleCloseAllProjectsDialog = () => {
    setOpenAllProjectsDialog(false);
  };

  return (
    <>
      <div className="Dashboard">
        <div className="emitter-upper">
          <div className="emitter-upper-1">
            <div className="emitter-upper-1-1">
              <p className="emitter-item-header">This year's offset</p>
              <p className="emitter-item-data">{Number(creditsByYear).toLocaleString()}</p>
            </div>
            <div className="emitter-upper-1-3">
              <p style={{
                color: Number(creditsByYear) > yearlyAverage ? 'green' : 'red',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                {Number(creditsByYear) !== 0 && (
                  <>
                    <span style={{ fontSize: '0.9em' }}>
                      {Number(creditsByYear) > yearlyAverage ? '▲' : '▼'}
                    </span>
                    {`${((creditsByYear / yearlyAverage) * 100 - 100).toFixed(2)}% (Last Year's)`}
                  </>
                )}
              </p>
            </div>
            <hr className="divider" />
            <div className="emitter-upper-1-2">
              <p className="emitter-item-header">Yearly Average</p>
              <p className="emitter-item-data">{Number(Math.round(yearlyAverage)).toLocaleString()}</p>
            </div>

          </div>
          <div className="emitter-upper-2">
            <div className="emitter-upper-2-1">
              <h2>Graph of this year's purchased credits</h2>
            </div>
            <ResponsiveContainer width="100%" height={200} className="emitter-upper-2-2">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date_bought"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 6)}
                />
                <YAxis
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <Bar
                  dataKey="credit_amount"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                  barSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="emitter-middle">
          <div className="emitter-middle-1">
            <div className="emitter-middle-1-1">
              <h2 className="text-2xl font-bold">Active Projects</h2>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search projects"
                value={projectSearchTerm}
                onChange={handleProjectSearchChange}
                style={{ width: '100%', marginTop: '10px' }}
              />
            </div>
            <div className="emitter-middle-1-2">
              <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 300 }} aria-label="active projects table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '30%' }}>Project Name</TableCell>
                      <TableCell align="center">Credit Amount</TableCell>
                      <TableCell align="right">Date Issued</TableCell>
                      <TableCell align="right">Crediting Period</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ textAlign: 'center' }}>
                    {activeAndVerifiedRows && activeAndVerifiedRows.length > 0 ? (
                      activeAndVerifiedRows.slice(0, 4).map((row, index) => (
                        <TableRow
                          key={index}
                          onClick={() => handleRowClick(row)}
                          sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                        >
                          <TableCell component="th" scope="row" style={{ width: '30%' }}>{shortenName(row.project_name)}</TableCell>
                          <TableCell align="center">{row.credit_amount}</TableCell>
                          <TableCell align="right">{formatDate(row.date_issued)}</TableCell>
                          <TableCell align="right">{row.period_covered}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">No transactions found.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {activeAndVerifiedRows && activeAndVerifiedRows.length > 4 && (
                <Button variant="contained" onClick={handleOpenAllProjectsDialog} sx={{ mt: 2 }}>
                  View More
                </Button>
              )}
            </div>
          </div>
          <div className="emitter-middle-2">
            <div className="emitter-middle-2-1">
              <p className="emitter-item-header">Active Projects</p>
              <p className="emitter-item-data">{activeAndVerifiedRows.length}</p>
            </div>
            <div className="emitter-middle-2-2">
              <p className="emitter-item-header">Total Active Credits</p>
              <p className="emitter-item-data">{Number(totalCreditsActiveAndVerified).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="emitter-lower">
          <div className="emitter-lower-1">
            <div className="emitter-lower-1-1">
              <p className="emitter-item-header">Total Credits Bought</p>
              <p className="emitter-item-data">{totalCredits}</p>
            </div>
            <hr className="divider" />
            <div className="emitter-lower-1-2">
              <p className="emitter-item-header">Total Transactions</p>
              <p className="emitter-item-data">{allTransactions.length}</p>
            </div>
          </div>
          <div className="emitter-lower-2">
            <div className="emitter-lower-2-heading flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recent Purchases</h2>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search by project name"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ width: '70%' }}

              />
            </div>
            <TableContainer
              component={Paper}
              sx={{
                border: '1px solid rgba(224, 224, 224, 1)',
                height: '220px', // Set a fixed height (adjust as needed)
                overflowY: 'auto' // Enable vertical scrolling
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="transaction table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Project Name</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Credit Amount</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Date Bought</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Transaction Hash</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionsToDisplay.length > 0 ? (
                    transactionsToDisplay.map((transaction, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center" sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                          {shortenName(transaction.project_name)}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row" sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                          {transaction.credit_amount}
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>{formatDate(transaction.date_bought)}</TableCell>
                        <TableCell align="center" sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                          <a href={`https://sepolia.etherscan.io/tx/${transaction.transaction_hash}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                            {shortenAddress(transaction.transaction_hash)}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                        No transactions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      {/* Dialog for all projects */}
      <Dialog open={openAllProjectsDialog} onClose={handleCloseAllProjectsDialog} maxWidth="md" fullWidth>
        <DialogTitle>All Active Projects</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="all active projects table">
              <TableHead>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell align="right">Credit Amount</TableCell>
                  <TableCell align="right">Date Issued</TableCell>
                  <TableCell align="right">Crediting Period</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeAndVerifiedRows && activeAndVerifiedRows.length > 0 ? (
                  activeAndVerifiedRows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">{row.project_name}</TableCell>
                      <TableCell align="right">{row.credit_amount}</TableCell>
                      <TableCell align="right">{formatDate(row.date_issued)}</TableCell>
                      <TableCell align="right">{row.period_covered}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No transactions found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
      {/* Project Details Dialog */}
      {selectedProject && (
        <Dialog open={openProjectDialog} onClose={handleCloseProjectDialog} maxWidth="md" fullWidth>
          <DialogTitle style={{ padding: '1rem', fontSize: '1.5em', marginBottom: '20px' }}>
            <span style={{ fontWeight: 'bold' }}>Project Name:</span> {selectedProject.project_name}
          </DialogTitle>
          <DialogContent>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '1.15rem' }}>
                <p><strong>Credit Amount:</strong> {selectedProject.credit_amount}</p>
                <p><strong>Date Issued:</strong> {formatDate(selectedProject.date_issued)}</p>
                <p><strong>Crediting Period:</strong> {selectedProject.period_covered}</p>
                <p><strong>Country:</strong> {selectedProject.country}</p>
                <p><strong>Issued by:</strong> {shortenAddress(selectedProject.issuer_address)}</p>
              </div>
              <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={handleCloseProjectDialog}
                  variant="outlined"
                  size="large"
                  disabled={isPurchasing}
                >
                  Close
                </Button>
                <Button
                  onClick={handleBuyProject}
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isPurchasing}
                  style={{ backgroundColor: isPurchasing ? 'gray' : undefined }}
                >
                  {isPurchasing ? 'Purchasing...' : 'Purchase Credits'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default emitterDashboard;