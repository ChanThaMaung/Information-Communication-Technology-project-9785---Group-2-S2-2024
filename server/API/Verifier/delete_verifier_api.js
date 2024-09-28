import axios from "axios";
import { API_URL } from "./constants";

// Delete a verifier by transaction hash
export const deleteVerifier = async (txHash) => {
    const response = await axios.delete(API_URL + "/" + txHash);
    return response.data;
}

