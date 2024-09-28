import axios from "axios";
import { API_URL } from "./constants";

export const createEmitter = async (formData) => {
    const response = await axios.post(API_URL + "/create", formData);
    return response.data;
}