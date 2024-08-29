
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import {Home, Dashboard } from './components';
// import React from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
