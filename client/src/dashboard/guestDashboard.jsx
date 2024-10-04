import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import * as transactionsAPI from '../../../server/API/get_all_transactions';
import { useState, useEffect } from 'react';
import { shortenAddress } from '../scripts/shortenAddress';
import './css_files/guestDashboard.css';
function GuestDashboard({
  totalUniqueEmitter,
  totalUniqueIssuer,
  totalUniqueVerifier,
  totalIssuerCount,
  totalEmitterCount,
  totalVerifierCount,
  activeRows,
  retiredRows,
  totalTransactionCount,
}) {
  const [transactions, setTransactions] = useState([]);
  const pieData = [
    { name: 'Issuers', value: totalUniqueIssuer },
    { name: 'Emitters', value: totalUniqueEmitter },
    { name: 'Verifiers', value: totalUniqueVerifier },
  ];

  const COLORS = ['#06C', '#73C5C5', '#4CB140'];

  function formatDate(date) {
    const options = { year: 'numeric', month: 'short' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  function formatDateDDMonYYYY(date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  const getRecentTransactions = async () => {
    let transaction = [];
    transaction = await transactionsAPI.getAllTransactions();
    setTransactions(transaction);
  }

  useEffect(() => {
    getRecentTransactions();
  }, []);

  // Preprocess the activeRows data to include formatted dates
  const processedActiveRows = ((activeRows && activeRows.length > 0) ? activeRows : (retiredRows && retiredRows.length > 0) ? retiredRows : []).map(row => ({
    ...row,
    formattedDate: formatDateDDMonYYYY(row.date_issued)
  }));

  return (
    <>

      <div className="Dashboard">
        <div className="guest-upper">
          <div className="guest-upper-1">
            <div className="guest-upper-1-upper">
              <span className="bold-text">
                {(totalUniqueEmitter + totalUniqueIssuer + totalUniqueVerifier).toLocaleString()}
              </span>
              <p>Registered Users</p>
            </div>
            <hr className="divider" />
            <div className="guest-upper-1-lower">
              <h1 style={{ marginBottom: '0px', fontWeight: 'bold' }}>User Types</h1>
              <div className="guest-upper-1-lower-piechart">
                <div style={{ width: '100%', height: '200px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        fill="#FF5733"
                        label={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ outline: 'none' }} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', pointerEvents: 'none' }}
                        itemStyle={{ color: '#000' }}
                        cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="guest-upper-1-lower-legend">
                  {pieData.map((item, index) => (
                    <div key={item.name} className="guest-upper-1-lower-legend-item">
                      <div className="guest-upper-1-lower-legend-color" style={{ backgroundColor: COLORS[index] }}></div>
                      <span style={{ fontSize: '0.8em' }}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="guest-upper-2">
            <span className="bold-text">{totalIssuerCount.toLocaleString()}</span>
            <p className="mb-[15px]">Transactions made by Issuers</p>
            <span className="bold-text">{totalEmitterCount.toLocaleString()}</span>
            <p className="mb-[15px]">Transactions made by Emitters</p>
            <span className="bold-text">{totalVerifierCount.toLocaleString()}</span>
            <p className="mb-[15px]">Transactions made by Verifiers</p>
            <span className="bold-text">{totalTransactionCount.toLocaleString()}</span>
            <p className="mb-[15px]">Total Transactions</p>
          </div>
          <div className="guest-upper-3">
            <div className="guest-upper-3-upper">
              <h2 className="text-2xl font-bold">Recent Transactions</h2>
            </div>
            <div className="guest-upper-3-table"style={{ width: '100%' }}>
              <TableContainer component={Paper} style={{ width: '100%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Address</TableCell>
                      <TableCell align="center">Transaction</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{shortenAddress(transaction.address)}</TableCell>
                        <TableCell align="center">{shortenAddress(transaction.transaction_hash)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>

        {/* Bottom Div */}
        <div className="guest-lower">
          <div className="guest-lower-1">
            
            <ResponsiveContainer width="100%" height={350}>
              <LineChart margin={{ top: 10, right: 30, bottom: 30, left: 30 }}>
                <XAxis dataKey="formattedDate" tickFormatter={formatDate} axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickMargin={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickMargin={10} />
                <Tooltip />
                <Line type="linear" dataKey="credit_amount" data={processedActiveRows} stroke="#484848" dot={{ stroke: '#484848', r: 1, strokeWidth: 4.5 }} />
              </LineChart>
            </ResponsiveContainer>
            <h2 className="emitter-item-header" style={{marginTop: '10px'}}>Showing {activeRows.length > 0 ? 'active' : 'retired'} credits</h2>
          </div>
          <div className="guest-lower-2">
            <span className="bold-text">
              {activeRows.reduce((sum, row) => sum + row.credit_amount, 0).toLocaleString()}
            </span>
            <p style={{ margin: '0 0 15px 0' }}>Issued credits recorded</p>
            <hr style={{ border: '1px solid #ccc', width: '80%', margin: '10px 0' }} />
            <span className="bold-text">
              {retiredRows.reduce((sum, row) => sum + row.credit_amount, 0).toLocaleString()}
            </span>
            <p>Retired credits recorded</p>
          </div>
        </div>
      </div >
    </>
  );
}

export default GuestDashboard;