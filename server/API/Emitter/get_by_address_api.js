import axios from "axios";
import { API_URL } from "./constants";


export const getCreditsByYear = async (address) => {
    const response = await axios.get(API_URL + "/get_credits_by_year/" + address);
    return response.data;
}

export const getLatestCreditsByAddress = async (address) => {
    const response = await axios.get(API_URL + "/get_latest_credits_by_address/" + address);
    return response.data;
}

export const getByAddress = async (address) => {
    const response = await axios.get(API_URL + "/address/" + address);
    return response.data;
}

export const getYearlyAverage = async (address) => {
    const response = await axios.get(API_URL + "/yearly_average/" + address);
    return response.data;
}

export const getTotalCredits = async (address) => {
    const response = await axios.get(API_URL + "/get_total_credits/" + address);
    return response.data;
}


export const getTotalTransactions = async (address) => {
    const response = await axios.get(API_URL + "/get_total_trans/" + address);
    return response.data;
}

