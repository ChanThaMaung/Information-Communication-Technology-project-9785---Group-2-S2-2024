import axios from "axios";

export const getAllTransactions = async () => {
    const response = await axios.get("http://localhost:3000/all_transactions/all");
    return response.data;
}

export const addTransaction = async (transaction) => {
    const response = await axios.post("http://localhost:3000/all_transactions/add", transaction);
    return response.data;
}

