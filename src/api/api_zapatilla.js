import axios from "axios";

const API_URL = "http://localhost:8000";

export const getZapatillas = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${API_URL}/zapatillas?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching zapatillas:", error);
        throw error;
    }
}

export const getZapatillasId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/zapatillas/${id}`);
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
}

export const putZapatilla = async (id, putZapatilla) => {
    try {
        const response = await axios.put(`${API_URL}/zapatillas/${id}`, putZapatilla);
        return response.data;
    } catch (error) {
        console.log("Error al actualizar", error);
        throw error;
    }
}

export const deleteZapatilla = async (id) =>{
    try {
        const response = await axios.delete(`${API_URL}/zapatillas/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error al eliminar", error);
        throw error;
    }
}