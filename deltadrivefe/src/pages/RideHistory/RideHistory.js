import React, {useEffect, useState} from "react";
import {getRideHistory} from "../../Service/PassengerService";


const RideHistory = () => {

    const [rideHistory, setRideHistory] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await getRideHistory();
                setRideHistory(response);
                console.log(response);
            } catch (error) {
                console.error("API Error:", error);
            }
        }

        fetchData(); // Call the async function immediately

    }, []);

    return (
        <div>
            {rideHistory && (
                <table style={{width: '100%'}}>
                    <thead>
                    <tr style={{height:'40px', background:'black', color:'white'}}>
                        <th>Ride Price</th>
                        <th>Start Latitude</th>
                        <th>Start Longitude</th>
                        <th>End Latitude</th>
                        <th>End Longitude</th>

                        <th>Ride Rating</th>
                        <th>Ride Comment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rideHistory.userHistory.map((data, index) => (
                        <tr key={index}>
                            <td>{data.TotalPrice.toFixed(2)} EUR</td>
                            <td>{data.StartLatitude}</td>
                            <td>{data.StartLongitude}</td>
                            <td>{data.DestinationLatitude}</td>
                            <td>{data.DestinationLongitude}</td>

                            <td>{data.Rating}</td>
                            <td>{data.Comment}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
};


export default RideHistory;