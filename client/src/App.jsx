
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { NotFound, RTCryptoChart,
 DashboardforEmiiter, Homev2, TransactionPagev2 } from "./Pages";
// import React from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homev2/>} />
          <Route path="/homev2" element={<Homev2 />} />
          <Route path="/rtcryptochart" element={<RTCryptoChart/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/dashboardforemitter" element={<DashboardforEmiiter/>}/>
          <Route path="/transactionpage" element={<TransactionPagev2/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
