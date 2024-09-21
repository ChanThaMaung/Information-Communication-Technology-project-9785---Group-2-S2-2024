import {Navbar, Footer } from './components';
import Dashboard from './dashboard/dashboard';
import {useEffect, useState} from 'react';
// import axios from 'axios';

function App() {
  
  return (
    <>
      <div className="App">
        <Navbar /> 
        {/* <Header />  */}
        <Dashboard />
        <Footer />
      </div>
    </>
  )
}

export default App
