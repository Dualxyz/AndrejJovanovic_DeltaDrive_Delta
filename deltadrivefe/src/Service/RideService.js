import axios from "axios";

const userId = localStorage.getItem('id');
const token = localStorage.getItem('token')
const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
};

export const bookRide = async (data) => {
    const apiUrl = "https://localhost:7231/api/Rides";
    console.error("ER DATA: " + data);

    try{
        const response = await axios.post(apiUrl, data, config);
        console.log("API Response:", response.data);
        return response;
    } catch(error){
        console.log("API Error: ", error);
    }
}

export const rateRide = async (rideId, review, comment) => {
    const apiUrl = `https://localhost:7231/api/Rides/${rideId}/rate`;
    let rating = Number(review);

    try{
        const response = await axios.post(apiUrl, {rating, comment}, config);
        console.log("API Response:", response.data);
        return response;
    } catch(error) {
        console.log("API Error: ", error);
        throw error;
    }
}