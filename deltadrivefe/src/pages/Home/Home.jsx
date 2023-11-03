import React, { useState, useEffect } from "react";
// import BookButton from "../../components/BookButton/BookButton";
import BookModal from "../../components/BookButton/BookModal";
import {getPassengerDetails, getNearbyDrivers} from "../../Service/PassengerService";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 4,

};
const Home = () => {
    const [data, setData] = useState(null);
    // const userId = localStorage.getItem('id');
    // const token = localStorage.getItem('token')
    const [currentLocation, setCurrentLocation] = useState(null);
    const [nearbyDrivers, setNearbyDrivers] = useState(null);
    const [userId, getUserId] = useState(null);
    const [token, getToken] = useState(null);


    //MODAL STATES
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getPassengerDetails();
                setData(data);
            } catch (error) {
                console.error("API Error:", error);
            }
        }

        fetchData(); // Call the async function immediately
        getToken(localStorage.getItem('token'));
        getUserId(localStorage.getItem('id'))

    }, []);

    const handleGetLocation = async () => {
        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });


            } catch (error) {
                console.error("Error getting location:", error);
            }
        } else {
            console.error("Geolocation is not supported by your browser.");
        }
    };

    const handleGetNearbyDrivers = async () => {
        try{
            const response = await getNearbyDrivers(currentLocation);
            setNearbyDrivers(response);
        } catch (error) {
            console.error("API Error:", error);
        }

    }

    return (
        <div className="text-center">
            <h2 style={{fontWeight: 800}}>Welcome to DeltaDrive's Homepage, {data ? data.firstName : ''}!</h2>

            <button className="btn btn-dark" onClick={handleGetLocation}>Get Location</button>
            {currentLocation && (
                // <div>
                //     <p>Your Current Location:</p>
                //     <p>Latitude: {currentLocation.latitude}</p>
                //     <p>Longitude: {currentLocation.longitude}</p>
                //     <button className="btn btn-dark" onClick={handleGetNearbyDrivers}>Get Nearby Drivers</button>
                // </div>
                <div>

                <div style={{display: 'flex', justifyContent: 'center', margin: '0 30%'}}>
                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">Your Current Location:</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Latitude: <span style={{fontWeight: 800}}>{currentLocation.latitude}</span></td>
                        </tr>
                        <tr>
                            <td>Longitude: <span style={{fontWeight: 800}}>{currentLocation.longitude}</span></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                    <button className="btn btn-dark" onClick={handleGetNearbyDrivers}>Get Nearby Drivers</button>
                </div>
            )}

            <div>
            {nearbyDrivers && (
                <div>
                    <h2 style={{marginTop: '24px', fontWeight: 800}}>Nearby Drivers</h2>
                    <table>
                        <thead>
                        <tr>
                            {Object.keys(nearbyDrivers[0]).map((key) => (
                                <th style={{background: '#000', color:'white'}} key={key}>{key}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {nearbyDrivers.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                                <td>
                                    <BookModal driver={item} currentLocation={currentLocation}></BookModal>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            </div>

        </div>
    );
};

export default Home;