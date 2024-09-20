import {Navbar, Footer, Dashboard } from './components';
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
