import axios from "axios";
import { API_URL } from "./constants";

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


export const getOneEmitter = async (txHash) => {
    const response = await axios.get(API_URL + "/" + txHash);
    return response.data;
}



