import React, {useMemo} from "react";
import {useLocation} from "react-router-dom";
import {useState,useEffect} from "react";
import {Countdown} from "./Countdown";
import moment from "moment/moment";

const Dashboard = () => {

    const location = useLocation();
    const rideData = location.state && location.state.rideData;
    const rideLat = location.state && location.state.rideLat;
    const rideLon = location.state && location.state.rideLon;

    const [test, setTest] = useState(0);


    // useEffect(() => {
    //     let isMounted = true; // A variable to track if the component is mounted
    //
    //     const fetchData = async () => {
    //         for (let i = Math.ceil(ArriveTimeToCustomer * 3600); i >= 0; i--) {
    //             if (!isMounted) {
    //                 // If the component is unmounted, exit the loop
    //                 break;
    //             }
    //             //TODO - fix timer formating and set flags for api call to know if ride taken
    //             //TODO - add be endpoint to handle flags for ride taken/free
    //             //TODO - add flag for one timer done / start another one aka if for xDDD
    //             await timeout(1000);
    //             setTest(i);
    //         }
    //     };
    //
    //     fetchData();
    //
    //     return () => {
    //         isMounted = false; // Mark the component as unmounted in the cleanup function
    //     };
    // }, []);

    let carArrivedToCustomer = false;
    let carArrivedToDestination = false;

    const ArriveTimeToCustomer=calculateDistance(rideLat, rideLon, rideData.startLatitude, rideData.startLongitude) / 60;
    const ArriveTimeToDestination=calculateDistance(rideData.startLatitude, rideData.startLongitude, rideData.destinationLatitude, rideData.destinationLongitude) / 60;
    const [startingTimeCustomerArrival] = useState(moment());
    const [startingTimeDestinationArrival] = useState(moment());
    const [rideArrived, setRideArrived] = useState(false);
    const [rideCompleted, setRideCompleted] = useState(false);
    const [currentTime, setCurrentTime] = useState(moment());

    const customerArrivalAt = useMemo(() => {
        return moment(startingTimeCustomerArrival).add(ArriveTimeToCustomer  * 3600 * 1000, "milliseconds");
    }, [startingTimeCustomerArrival, ArriveTimeToCustomer]);

    const destinationArrivalAt = useMemo(() => {
        if (!rideArrived) {
            return null;
        }
        return moment(startingTimeDestinationArrival).add(ArriveTimeToDestination  * 3600 * 1000, "milliseconds");
    }, [rideArrived, startingTimeDestinationArrival, ArriveTimeToDestination]);

    useEffect(() => {
        if (rideArrived === false && customerArrivalAt && customerArrivalAt.isBefore(currentTime)) {
            setRideArrived(true);
        }
    }, [currentTime, customerArrivalAt, rideArrived]);

    useEffect(() => {
        if (rideCompleted === false && destinationArrivalAt && destinationArrivalAt.isBefore(currentTime)) {
            setRideCompleted(true);
        }
    }, [currentTime, destinationArrivalAt, rideCompleted]);

    return(
    <div>
        <h1>Dashboard</h1>

        <p>RideID: {rideData.id}</p>
        <p>DriverID: {rideData.driverId}</p>
        <p>PassengerID: {rideData.passengerId}</p>
        <p>RideStatus: {rideData.rideStatus}</p>

        {/*MY POSITION*/}
        <p>startLatitude: {rideData.startLatitude}</p>
        <p>startLongitude: {rideData.startLongitude}</p>

        {/*MY DESTINATION*/}
        <p>destinationLatitude: {rideData.destinationLatitude}</p>
        <p>destinationLongitude: {rideData.destinationLongitude}</p>
        {/*CAR DESTINATION*/}
        <p>Ride Latitude: {rideLat}</p>
        <p>Ride Longitude: {rideLon}</p>
        <p>totalPrice: {rideData.totalPrice}</p>
        {/*<p>rating: {rideData.rating}</p>*/}
        {/*<p>comment: {rideData.comment}</p>*/}
        <p>Time to arive to customer: {ArriveTimeToCustomer}</p>
        <p>Time to arive from customer to destination: {ArriveTimeToDestination}</p>
        {rideArrived ? "Ride arrived": <Countdown startingTime={startingTimeCustomerArrival} arrivalAt={customerArrivalAt} currentTime={currentTime} setCurrentTime={setCurrentTime}/>}
        {rideCompleted ? "Ride completed" : destinationArrivalAt && <Countdown startingTime={startingTimeDestinationArrival}  arrivalAt={destinationArrivalAt}  currentTime={currentTime} setCurrentTime={setCurrentTime}/>}

    </div>
    );
}
function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}
function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Earth's radius in kilometers

    // Convert latitude and longitude from degrees to radians
    const radLat1 = (Math.PI * lat1) / 180;
    const radLon1 = (Math.PI * lon1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const radLon2 = (Math.PI * lon2) / 180;

    // Calculate the differences in latitude and longitude
    const latDiff = radLat2 - radLat1;
    const lonDiff = radLon2 - radLon1;

    // Use Haversine formula to calculate the distance
    const a =
        Math.sin(latDiff / 2) ** 2 +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(lonDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
}
export default Dashboard;