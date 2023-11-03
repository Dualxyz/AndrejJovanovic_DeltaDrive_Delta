import React, {useMemo} from "react";
import {useLocation} from "react-router-dom";
import {useState,useEffect} from "react";
import {Countdown} from "./Countdown";
import moment from "moment/moment";
import Comment from "../../components/BookButton/Comment";
import RatingSystem from "../../components/BookButton/RatingSystem";

const Dashboard = () => {
    const location = useLocation();
    const rideData = location.state && location.state.rideData;
    const rideLat = location.state && location.state.rideLat;
    const rideLon = location.state && location.state.rideLon;

    const ArriveTimeToCustomer=calculateDistance(rideLat, rideLon, rideData.startLatitude, rideData.startLongitude) / 60;
    const ArriveTimeToDestination=calculateDistance(rideData.startLatitude, rideData.startLongitude, rideData.destinationLatitude, rideData.destinationLongitude) / 60;
    const [startingTimeCustomerArrival] = useState(moment());
    const [startingTimeDestinationArrival] = useState(moment());
    const [rideArrived, setRideArrived] = useState(false);
    const [rideCompleted, setRideCompleted] = useState(false);
    const [currentTime, setCurrentTime] = useState(moment());

    const [review, setReview] = useState(0);

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
        <div>
            <span>Countdown from DRIVER to PASSENGER: </span>
            {rideArrived ? <div style={{color: 'green', fontWeight:900, fontSize:'50px'}}>Ride arrived</div>:
                <Countdown startingTime={startingTimeCustomerArrival} arrivalAt={customerArrivalAt} currentTime={currentTime} setCurrentTime={setCurrentTime}/>
            }
        </div>

        <div>
            <span>Countdown from PASSENGER to DESTINATION: </span>
            {rideCompleted ? <div style={{color: 'green', fontWeight:900, fontSize:'50px'}}>Ride completed</div> : destinationArrivalAt && <Countdown startingTime={startingTimeDestinationArrival}  arrivalAt={destinationArrivalAt}  currentTime={currentTime} setCurrentTime={setCurrentTime}/>}
        </div>

        <div>
            {rideCompleted ?
                <div>
                    {/*<div>{rideData.id}</div>*/}
                    <RatingSystem starCount={5} setReview={setReview} ></RatingSystem>
                    <Comment review={review} rideId={rideData.id}></Comment>
                </div>: <span></span>}
        </div>


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