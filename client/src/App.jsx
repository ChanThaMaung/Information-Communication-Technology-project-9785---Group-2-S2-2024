import Dashboard from './dashboard/dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionPage from './Pages/TransactionPage/TransactionPage';
import Home from './Pages/Home/Home';

function App() {

  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        {/* <DashboardNavbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction_page" element={<TransactionPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
