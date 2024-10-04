import axios from "axios";
import { API_URL } from "../Verifier/constants";

/*
    THIS FILE IS TO GET THE DATA THAT IS VERIFIED BY AN ADDRESS
*/

export const getByAddress = async (address) => {
    const response = await axios.get(API_URL + "/getByAddress/" + address);
    return response.data;
}

export const getVerifiedIssuerCredits = async (address) => {
    const response = await axios.get(API_URL + "/getVerifiedIssuerCredits/"+address);
    return response.data;
}

export const getTransactionCount = async (address) => {
    const response = await axios.get(API_URL + "/getTransactionCount/"+address);
    return response.data;
}

export const getTotalCreditsByAddress = async (address) => {
    const response = await axios.get(API_URL + "/getTotalCreditsByAddress/"+address);
    return response.data;
}


