// src/Services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update if your backend URL changes



export const fetchTransactions = async (month, search, page) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/products`, {
            params: { month, search, page }
        });
        return response;
    } catch (error) {
        console.error("Error fetching transactions from API:", error);
        throw error;
    }
};


export const fetchStatistics = async (month) => {
    return axios.get(`${API_BASE_URL}/api/statistics`, {
        params: { month }
    });
};

export const fetchBarChart = async (month) => {
    return axios.get(`${API_BASE_URL}/api/barchart`, {
        params: { month }
    });
};
