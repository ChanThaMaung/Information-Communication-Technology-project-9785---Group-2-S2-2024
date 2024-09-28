import Dashboard from './dashboard/dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionPage from './Pages/TransactionPage/TransactionPage';
import Home from './Pages/Home/Home';
import InputPageIssuer from './Pages/InputPage/InputPageIssuer';
import InputPageEmitter from './Pages/InputPage/InputPageEmitter';

function App() {

  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        {/* <DashboardNavbar /> */}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction_page" element={<TransactionPage />} />
          <Route path="/input-issuer" element={<InputPageIssuer />} />
          <Route path="/input-emitter" element={<InputPageEmitter />} />
          {/* <Route path="/guest-dashboard" element={<GuestDashboard />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
