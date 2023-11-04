import axios from "axios";

const userId = localStorage.getItem('id');
const token = localStorage.getItem('token')
const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
};

export const bookRide = async (data) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/Rides`;

    try{
        const response = await axios.post(apiUrl, data, config);
        console.log("API Response:", response.data);
        return response;
    } catch(error){
        console.log("API Error: ", error);
    }
}

export const rateRide = async (rideId, review, comment) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/Rides/${rideId}/rate`;
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