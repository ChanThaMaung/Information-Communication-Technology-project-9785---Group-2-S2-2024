import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/IssuerConstants";
import { getEthereumContract } from "./GlobalFunctions/getEthereumContract";
import { connectWallet as connectWalletFunction } from "./GlobalFunctions/connectWallet";

export const VerifierContext = React.createContext();

return (
    <VerifierContext.Provider
         value = {}>
        {children}
    </VerifierContext.Provider>
)