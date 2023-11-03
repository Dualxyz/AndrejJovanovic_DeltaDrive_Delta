import React, {useEffect, useState} from "react";
import BookModal from "../../components/BookButton/BookModal";
import {getNearbyDrivers, getPassengerDetails, getRideHistory} from "../../Service/PassengerService";


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
                <table>
                    <thead>
                    <tr>
                        {/*starting and ending location, total price of the trip and a driver that was booked at that point of time.*/}
                        {/*<th>ID</th>*/}
                        {/*<th>Driver ID</th>*/}
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
                            {/*<td>{data.Id}</td>*/}
                            {/*<td>{data.DriverId}</td>*/}
                            <td>{data.TotalPrice.toFixed(2)} EUR</td>
                            <td>{data.StartLatitude}</td>
                            <td>{data.StartLongitude}</td>
                            <td>{data.DestinationLatitude}</td>
                            <td>{data.DestinationLongitude}</td>
                            <td>{data.Comment}</td>
                            <td>{data.Rating}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
};


export default RideHistory;