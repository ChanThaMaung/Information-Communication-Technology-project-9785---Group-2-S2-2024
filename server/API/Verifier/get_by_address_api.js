import axios from "axios";
import { API_URL } from "../Verifier/constants";

/*
    THIS FILE IS TO GET THE DATA THAT IS VERIFIED BY AN ADDRESS
*/

export const getByAddress = async (address) => {
    const response = await axios.get(API_URL + "/getByAddress/" + address);
    return response.data;
}


export const getRows = async (address) => {
    const response = await axios.get(API_URL + "/getRows/"+address);
    return response.data;
}

export const getVerifiedIssuerCredits = async (address) => {
    const response = await axios.get(API_URL + "/getVerifiedIssuerCredits/"+address);
    return response.data;
}

export const getTransactionCount = async (address, type) => {
    const response = await axios.get(API_URL + "/getTransactionCount/"+address+"/"+type);
    return response.data;
}

export const getVerifiedEmitterCredits = async (address) => {
    const response = await axios.get(API_URL + "/getVerifiedEmitterCredits/"+address);
    return response.data;
}


