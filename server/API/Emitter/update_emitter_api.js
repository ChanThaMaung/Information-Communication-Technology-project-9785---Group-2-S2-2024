import axios from "axios";
import { API_URL } from "./constants";

export const updateEmitter = async (txHash, formData) => {
    const response = await axios.put(API_URL + "/update/" + txHash, formData);
    return response.data;
}