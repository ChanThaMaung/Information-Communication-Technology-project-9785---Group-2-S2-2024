import axios from "axios";
import { API_URL } from "./constants";


export const getActiveAndVerifiedRows = async () => {
    const response = await axios.get(API_URL + "/getActiveAndVerifiedRows");
    return response.data;
}

export const getTotalCreditsActiveAndVerified = async () => {
    const response = await axios.get(API_URL + "/getTotalCreditsActiveAndVerified");
    return response.data;
}

export const getActiveRows = async () => {
    const response = await axios.get(API_URL + "/active-rows");
    return response.data;
}

export const getRetiredRows = async () => {
    const response = await axios.get(API_URL + "/retired-rows");
    return response.data;
}

export const getRetiredCredits = async () => {
    const response = await axios.get(API_URL + "/retired");
    return response.data;
}

export const getActiveCredits = async () => {
    const response = await axios.get(API_URL + "/issued");  
    return response.data;
}

export const getVerifiedIssuerCount = async () => {
    const response = await axios.get(API_URL + "/verified/count");
    return response.data;
}

export const getUnverifiedIssuer = async () => {
    const response = await axios.get(API_URL + "/unverified");
    return response.data;
}

// Fetch the number of all issuer transactions
export const getCountIssuer = async () => {
    const response = await axios.get(API_URL + "/count");
    return response.data;
}

// Fetch the number of unique issuer addresses
export const getUniqueIssuer = async () => {
    const response = await axios.get(API_URL + "/addresses");
    return response.data;
}

// Fetch the total amount of verified credits issued
export const getTotalIssuer = async () => {
    const response = await axios.get(API_URL + "/total");
    return response.data;
}

// Fetch all issuer transactions
export const getAllIssuer = async (filters) => {
    const response = await axios.get(API_URL + "/all", { params: filters });
    return response.data;
}

// Fetch all unverified issuer transactions
export const getVerifiedIssuer = async () => {
    const response = await axios.get(API_URL + "/verified-count");
    return response.data;
}

// Fetch issuer transaction by transaction hash
export const getOneIssuer = async (txHash) => {
    const response = await axios.get(API_URL + "/" + txHash);
    return response.data;
}

export const getUnverifiedCount = async () => {
    const response = await axios.get(API_URL+"/unverified/count");
    return response.data;
  }
  