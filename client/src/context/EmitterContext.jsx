import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/IssuerConstants";
import { getEthereumContract } from "./GlobalFunctions/getEthereumContract";
import { connectWallet as connectWalletFunction } from "./GlobalFunctions/connectWallet";

export const EmitterContext = React.createContext();

const { ethereum } = window;

export const EmitterProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [formData, setFormData] = useState({
        amount: "",
        end_date: "",
        status: "",
    });

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
}