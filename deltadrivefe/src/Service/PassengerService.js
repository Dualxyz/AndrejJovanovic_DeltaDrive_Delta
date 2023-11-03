import axios from "axios";

const userId = localStorage.getItem('id');
const token = localStorage.getItem('token')

const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
};

export const getPassengerDetails = async (data) => {
    const apiUrl = "https://localhost:7231/api/Passengers/";

    try{
        const response = await axios.get(apiUrl + userId)
        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.log("API error", error);
    }
}

export const getNearbyDrivers = async (currentLocation) =>{
    const apiUrl = "https://localhost:7231/api/Passengers/NearbyDrivers";
    // console.warn(currentLocation);
    try{
        const response = await axios.post(apiUrl, currentLocation, config);
        console.log("API Response:", response.data);
        return response.data;
    } catch (error){
        console.log("API Error: ", error);
    }
}
export const getRideHistory = async (currentLocation) =>{
    const apiUrl = "https://localhost:7231/api/Rides";
    // console.warn(currentLocation);
    try{
        const response = await axios.get(apiUrl,config);
        console.log("API Response:", response.data);
        return response.data;
    } catch (error){
        console.log("API Error: ", error);
    }
}