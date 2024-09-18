
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Dashboard, Home, NotFound, SignIn, SignUp, RTCryptoChart } from "./Pages";
// import React from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/signIn" element={<SignIn/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/rtcryptochart" element={<RTCryptoChart/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
