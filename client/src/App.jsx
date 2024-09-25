import { Navbar, Footer } from './components';
import Dashboard from './dashboard/dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TransactionPage from './Pages/TransactionPage/TransactionPage'
// import axios from 'axios';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction_page" element={<TransactionPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
