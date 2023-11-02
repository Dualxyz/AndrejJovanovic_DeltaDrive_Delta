import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const BookButton = (props) => {
    const navigate = useNavigate();
    const payload = {
        "driverId": props.driver.Id,
        "startLatitude": props.currentLocation.latitude,
        "startLongitude": props.currentLocation.longitude,
        "destinationLatitude": props.latitude,
        "destinationLongitude": props.longitude,
    }

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };


    const bookRidehandler = async () => {
        await axios.post("https://localhost:7231/api/Rides", payload, config)
            .then((response) => {
                console.log(response.data);
                if(response.data.rideStatus === 2){
                    console.log("Accepted");

                    // console.log(driverLat);
                    navigate("/dashboard", { state: { rideData: response.data,  rideLat: props.driver.Latitude, rideLon: props.driver.Longitude }});
                } else {
                    console.log("rejected");
                    navigate("/");
                }
                // console.log(Object.keys(response.data[0])); // Extract keys from the first object
            })
            .catch((error) => {
                console.error("API request error:", error);
            });
    }

    return(
        <button className="btn btn-dark" onClick={bookRidehandler}> BOOK </button>
    )
}

export default BookButton;