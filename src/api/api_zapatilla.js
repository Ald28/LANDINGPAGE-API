import axios from "axios";

const API_URL = "http://localhost:8000";

export const getZapatillas = async () => {
    try {
        const response = await axios.get(`${API_URL}/zapatillas`);
        return response.data;
    } catch (error) {
        console.error("Error fetching zapatillas:", error);
        throw error;
    }
}

export const addZapatilla = async (addZapatilla) => {
    console.log("Adding zapatilla:", addZapatilla);
    try {
        const response = await axios.post(`${API_URL}/zapatillas`, addZapatilla);
        console.log("Zapatilla added successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding zapatilla:", error);
        throw error;
    }
