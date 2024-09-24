import axios from "axios";
import { API_URL } from "./constants";

export const deleteIssuer = async (txHash) => {
    const response = await axios.delete(API_URL + "/" + txHash);
    return response.data;
}

