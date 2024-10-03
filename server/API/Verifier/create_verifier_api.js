import axios from "axios";
import { API_URL } from "./constants";

// Create a new verifier
export const createVerifier = async (formData) => {
    const response = await axios.post(API_URL + "/create", formData);
    return response.data;
}