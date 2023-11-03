import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {bookRide} from "../../Service/RideService";

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
        try{
            let response = await bookRide(payload);
            console.warn(response);
            if(response.data.rideStatus === 2){
                console.log("Accepted");
                navigate("/dashboard", { state: { rideData: response.data,  rideLat: props.driver.Latitude, rideLon: props.driver.Longitude }});
            } else {
                console.log("rejected");
                navigate("/");
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    }

    return(
        <button className="btn btn-dark" onClick={bookRidehandler}> BOOK </button>
    )
}

export default BookButton;