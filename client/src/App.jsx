
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Dashboard, Home, NotFound, SignIn, SignUp, RTCryptoChart, DashboardforEmiiter, Homev2 } from "./Pages";
// import React from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/homev2" element={<Homev2 />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/signIn" element={<SignIn/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/rtcryptochart" element={<RTCryptoChart/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/dashboardforemitter" element={<DashboardforEmiiter/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
