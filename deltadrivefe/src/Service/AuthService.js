import axios from "axios";

export const login = async (data) => {
    try {
        const response = await axios.post("https://localhost:7231/api/Passengers/Login", data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (data) =>{
    try {
        const response = await axios.post("https://localhost:7231/api/Passengers/Register", data);
        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}