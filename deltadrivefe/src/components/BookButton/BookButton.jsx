import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {bookRide} from "../../Service/RideService";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookButton = (props) => {
    const navigate = useNavigate();
    const handleClose = props.handleClose;

    const payload = {
        "driverId": props.driver.Id,
        "startLatitude": props.currentLocation.latitude,
        "startLongitude": props.currentLocation.longitude,
        "destinationLatitude": props.latitude,
        "destinationLongitude": props.longitude,
    }

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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
                toast.success("Request Accepted");
                await delay(2000); // Wait for 2 seconds
                navigate("/dashboard", { state: { rideData: response.data,  rideLat: props.driver.Latitude, rideLon: props.driver.Longitude }});
            } else {
                console.log("rejected");
                toast.error("Request Rejected");
                await delay(2000);
                handleClose();
                navigate("/");
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    }

    return(
        <div>
            {/*<button onClick={notify}>Notify!</button>*/}
            <ToastContainer />
            <button className="btn btn-dark" onClick={bookRidehandler}> BOOK </button>
        </div>
    )
}

export default BookButton;