import axios from "axios";

const userId = localStorage.getItem('id');
const token = localStorage.getItem('token')
const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
};

// await axios.post("https://localhost:7231/api/Rides", payload, config)
//     .then((response) => {
//         console.log(response.data);
//         if(response.data.rideStatus === 2){
//             console.log("Accepted");
//             navigate("/dashboard", { state: { rideData: response.data,  rideLat: props.driver.Latitude, rideLon: props.driver.Longitude }});
//         } else {
//             console.log("rejected");
//             navigate("/");
//         }
//         // console.log(Object.keys(response.data[0])); // Extract keys from the first object
//     })
//     .catch((error) => {
//         console.error("API request error:", error);
//     });

export const bookRide = async (data) => {
    const apiUrl = "https://localhost:7231/api/Rides";

    try{
        const response = await axios.post(apiUrl, data, config);
        console.log("API Response:", response.data);
        return response;
    } catch(error){
        console.log("API Error: ", error);
    }
}