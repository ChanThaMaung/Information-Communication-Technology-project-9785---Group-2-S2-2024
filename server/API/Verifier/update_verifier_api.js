import axios from "axios";
import { API_URL } from "./constants";

// Update a verifier by transaction hash
export const updateVerifier = async (txHash, formData) => {
    const response = await axios.put(API_URL + "/update/" + txHash, formData);
    return response.data;
}

