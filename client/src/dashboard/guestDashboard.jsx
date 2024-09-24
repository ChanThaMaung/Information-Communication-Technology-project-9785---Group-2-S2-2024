import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function GuestDashboard({
  handleConnectWallet,
  totalUniqueEmitter,
  totalUniqueIssuer,
  totalUniqueVerifier,
  totalIssuerCount,
  totalEmitterCount,
  totalVerifierCount,
  retiredRows,
  activeRows,
}) {
  const pieData = [
    { name: 'Issuers', value: totalUniqueIssuer },
    { name: 'Emitters', value: totalUniqueEmitter },
    { name: 'Verifiers', value: totalUniqueVerifier },
  ];

  const COLORS = ['#488A99', '#AC3E31', '#DBAE58'];

  function formatDate(date) {
    const options = { year: 'numeric', month: 'short' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  function formatDateDDMonYYYY(date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  // Preprocess the activeRows data to include formatted dates
  const processedActiveRows = (activeRows || []).map(row => ({
    ...row,
    formattedDate: formatDateDDMonYYYY(row.date_issued),
  }));

  const startDate = new Date('2020-01-01');
  const formattedStartDate = formatDate(startDate);

  return (
    <>

      <div className="parent-div">
        <div className="guest-dashboard-upper">
          <div className="user-types-container">
            <div className="user-types-content">
              <span className="bold-text">
                {(totalUniqueEmitter + totalUniqueIssuer + totalUniqueVerifier).toLocaleString()}
              </span>
              <p>Registered Users</p>
            </div>
            <hr className="divider" />
            <div style={{ borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ marginBottom: '0px', fontWeight: 'bold' }}>User Types</h1>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                <div style={{ width: '55%', height: '200px' }}>
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
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                  {pieData.map((item, index) => (
                    <div key={item.name} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                      <div style={{ width: '20px', height: '20px', backgroundColor: COLORS[index], marginRight: '5px', borderRadius: '50%' }}></div>
                      <span style={{ fontSize: '0.8em' }}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '20%', borderRadius: '10px', padding: '20px', marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span className="bold-text">{totalIssuerCount.toLocaleString()}</span>
            <p className="mb-[15px]">Transactions made by Issuers</p>
            <span className="bold-text">{totalEmitterCount.toLocaleString()}</span>
            <p className="mb-[15px]">Transactions made by Emitters</p>
            <span className="bold-text">{totalVerifierCount.toLocaleString()}</span>
            <p className="mb-[15px]">Transactions made by Verifiers</p>
          </div>
          <div className="guest-dashboard-recent">
            <div style={{ width: '100%', marginBottom: '1rem' }}>
              <h2 className="text-xl font-bold">Recent Transactions</h2>
            </div>
            <div style={{ width: '100%' }}>
              <TableContainer component={Paper} style={{ width: '100%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Address</TableCell>
                      <TableCell align="center">Transaction</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Add table rows here */}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>

        {/* Bottom Div */}
        <div className="guest-dashboard-lower">
          <div className="guest-dashboard-line">
            <ResponsiveContainer width="100%" height={500}>
              <LineChart margin={{ top: 10, right: 30, bottom: 30, left: 30 }}>
                <XAxis dataKey="formattedDate" tickFormatter={formatDate} axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickMargin={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickMargin={10} />
                <Tooltip />
                <Line type="linear" dataKey="credit_amount" data={processedActiveRows} stroke="#484848" dot={{ stroke: '#484848', r: 1, strokeWidth: 4.5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="guest-dashboard-credit">
            <span className="bold-text">
              {activeRows.reduce((sum, row) => sum + row.credit_amount, 0).toLocaleString()}
            </span>
            <p style={{ margin: '0 0 15px 0' }}>Carbon Credits Issued</p>
            <hr style={{ border: '1px solid #ccc', width: '80%', margin: '10px 0' }} />
            <span className="bold-text">
              {retiredRows.reduce((sum, row) => sum + row.credit_amount, 0).toLocaleString()}
            </span>
            <p>Carbon Credits Retired</p>
          </div>
        </div>
      </div >
    </>
  );
}

export default GuestDashboard;