import axios from "axios";
import { API_URL } from "./constants";

// Fetch the number of all verifier transactions
export const getCountVerifier = async () => {
    const response = await axios.get(API_URL + "/count");
    return response.data;
}

// Fetch the number of unique verifier addresses
export const getUniqueVerifier = async () => {
    const response = await axios.get(API_URL + "/addresses");
    return response.data;
}

// Fetch all verifiers
export const getAllVerifier = async () => {
    const response = await axios.get(API_URL + "/all");
    return response.data;
}

// Fetch a verifier by transaction hash
export const getOneVerifier = async(txHash) => {
    const response = await axios.get(API_URL + "/" + txHash);
    return response.data;
}

