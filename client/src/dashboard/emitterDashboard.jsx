import React, { useState, useEffect, useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Label } from 'recharts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { shortenAddress } from "../scripts/shortenAddress"; // Add this import
// import * as getAllAPI from "../../../server/api/Emitter/get_emitter_api";
import * as getByAddressAPI from "../../../server/api/Emitter/get_by_address_api";

function emitterDashboard({
  handleSubmit,
  formatDate,
  currentEmitterAccount,
}) {
  const [formData, setFormData] = useState({
    emitter_address: "",
    project_name: "",
    credit_amount: "",
    date_bought: "",
    verification_status: "0",
    prev_tx: "",
  });
  const [totalCredits, setTotalCredits] = useState(0);
  const [creditsByYear, setCreditsByYear] = useState([]);
  const [yearlyTransactions, setYearlyTransactions] = useState([]);
  const [yearlyAverage, setYearlyAverage] = useState(0);
  const [verifiedCredits, setVerifiedCredits] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);
  const [unverifiedCredits, setUnverifiedCredits] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [pieData, setPieData] = useState([
    {
      name: 'Verified Credits',
      value: 0
    },
    {
      name: 'Unverified Credits',
      value: 0
    }
  ]);


  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formData.emitter_address = currentEmitterAccount;
    console.log("Sending data");
    handleSubmit(formData);
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

  }, [currentEmitterAccount]);

  useEffect(() => {
    const fetchData = async () => {
      const verifiedCreditsResponse = await getByAddressAPI.getAddressVerifiedCredits(currentEmitterAccount);
      const unverifiedCreditsResponse = await getByAddressAPI.getAddressUnverifiedCredits(currentEmitterAccount);

      const verifiedCredits = verifiedCreditsResponse[0].verified_credits;
      const unverifiedCredits = unverifiedCreditsResponse[0].unverified_credits;

      setVerifiedCredits(verifiedCredits);
      setUnverifiedCredits(unverifiedCredits);

      setPieData([
        {
          name: 'Verified Credits',
          value: Number(verifiedCredits)
        },
        {
          name: 'Unverified Credits',
          value: Number(unverifiedCredits)
        }
      ]);
    };

    fetchData();

  }, [currentEmitterAccount])

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

  console.log(pieData);
  return (
    <>
      <div className="Dashboard">
        <div className="emitter-upper">
          <div className="emitter-upper-1">
            <div className="emitter-upper-1-1">
              <p className="emitter-item-header">This year's offset</p>
              <p className="emitter-item-data">{Number(creditsByYear).toLocaleString()}</p>
            </div>
            <div className="emitter-upper-1-2">
              <p className="emitter-item-header">Yearly Average</p>
              <p className="emitter-item-data">{Number(Math.round(yearlyAverage)).toLocaleString()}</p>
            </div>
            <div>
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
                    {`${((creditsByYear / yearlyAverage) * 100).toFixed(2)}%`}
                  </>
                )} (Last Year's)
              </p>
            </div>
          </div>
          <div className="emitter-upper-2">
            <div className="emitter-upper-2-1">
              <h2>Graph of this year's purchased credits</h2>
            </div>
            <ResponsiveContainer width="100%" height={150}>
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
        <div className="emitter-lower">
          <div className="emitter-lower-1">
            <div className="emitter-lower-1-1">
              <p className="emitter-item-header">Total Credits Bought</p>
              <p className="emitter-item-data">{totalCredits}</p>
            </div>
            <div className="emitter-lower-1-2">
              <p className="emitter-item-header" style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>Verified Credits</p>

              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    innerRadius={60}
                    fill="#8884d8"
                    stroke="none"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} style={{outline: 'none'}} fill={COLORS[index % COLORS.length]} />
                    ))}
                    <Label
                      value={Number(verifiedCredits).toLocaleString()}
                      position="center"
                      fill="#000000"
                      style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        fontFamily: 'Arial',
                      }}
                    />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="emitter-lower-2">
            <div className="emitter-lower-2-heading flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recent Transactions</h2>
              <Button
                variant="contained"
                onClick={handleOpenCreateDialog}
              >
                Create New Transaction
              </Button>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search by project name"
                value={searchTerm}
                onChange={handleSearchChange}

              />
            </div>
            <TableContainer component={Paper} sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
              <Table sx={{ minWidth: 650 }} aria-label="transaction table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Project Name</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Credit Amount</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Date Bought</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Verification Status</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>Transaction Hash</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionsToDisplay.map((transaction, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center" sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                        {transaction.project_name}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row" sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                        {transaction.credit_amount}
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>{formatDate(transaction.date_bought)}</TableCell>
                      <TableCell align="center" sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                        {transaction.verification_status === 1 ? "Verified" : "Unverified"}
                      </TableCell>
                      <TableCell align="center" sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                        {shortenAddress(transaction.transaction_hash)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {((searchTerm && filteredTransactions.length > 4) || (!searchTerm && allTransactions.length > 4)) && (
              <Button
                variant="contained"
                onClick={() => setShowAllTransactions(!showAllTransactions)}
                sx={{ mt: 2 }}
              >
                {showAllTransactions ? "Show Less" : "View More"}
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* New Create Dialog */}
      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog} maxWidth="md" fullWidth>
        <DialogTitle>Create New Transaction</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2">
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
              <span className="mr-2 w-32">Carbon Credit:</span>
              <input
                name="credit_amount"
                type="number"
                value={formData.credit_amount}
                onChange={(e) => handleChange(e, "credit_amount")}
                className="form-control border border-black p-2 ml-2"
              />
            </div>
            <div className="flex items-center">
              <span className="mr-2 w-32">Date of Purchase:</span>
              <input
                name="date_bought"
                type="date"
                value={formData.date_bought}
                onChange={(e) => handleChange(e, "date_bought")}
                className="form-control border border-black p-2 ml-2"
              />
            </div>
            <button
              onClick={(e) => {
                onSubmit(e);
                handleCloseCreateDialog();
              }}
              className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 border border-black w-32"
            >
              Submit
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default emitterDashboard;