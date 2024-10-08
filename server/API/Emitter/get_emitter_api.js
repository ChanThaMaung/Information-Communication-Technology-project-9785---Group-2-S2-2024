import axios from "axios";
import { API_URL } from "./constants";

    
export const getVerifiedEmitterCount = async () => {
    const response = await axios.get(API_URL + "/verified/count");
    return response.data;
}

export const getCreditsData = async () => {
    const response = await axios.get(API_URL + "/credits-data");
    return response.data;
}

export const getUnverifiedEmitter = async () => {
    const response = await axios.get(API_URL + "/unverified");
    return response.data;
}

export const getAllEmitter = async (filters) => {
    const response = await axios.get(API_URL + "/all", { params: filters });
    return response.data;
}

export const getCountEmitter = async () => {
    const response = await axios.get(API_URL + "/count");
    return response.data;
}

export const getUniqueEmitter = async () => {
    const response = await axios.get(API_URL + "/addresses");
    return response.data;
}

export const getTotalEmitter = async () => {
    const response = await axios.get(API_URL + "/total");
    return response.data;
}

export const getVerifiedEmitter = async () => {
    const response = await axios.get(API_URL + "/verified-count");
    return response.data;
}

export const getOneEmitter = async (txHash) => {
    const response = await axios.get(API_URL + "/" + txHash);
    return response.data;
}

export const getTotalCredits = async () => {
    const response = await axios.get(API_URL + "/total-credits");
    return response.data;
}



