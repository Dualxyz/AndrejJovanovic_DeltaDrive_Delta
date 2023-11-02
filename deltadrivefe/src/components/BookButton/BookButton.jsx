import React from "react";
import axios from "axios";

const BookButton = (props) => {

    const bookRidehandler = async () => {
        console.log(props.driver.Id);
        console.log(props.currentLocation);
        const token = localStorage.getItem('token')

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };

        // await axios.post("https://localhost:7231/api/Rides", payload, config)
        //     .then((response) => {
        //         setNearbyDrivers(response.data);
        //         console.log(response.data);
        //         // console.log(Object.keys(response.data[0])); // Extract keys from the first object
        //     })
        //     .catch((error) => {
        //         console.error("API request error:", error);
        //     });
    }

    return(
        <button className="btn btn-dark" onClick={bookRidehandler}> BOOK </button>
    )
}

export default BookButton;