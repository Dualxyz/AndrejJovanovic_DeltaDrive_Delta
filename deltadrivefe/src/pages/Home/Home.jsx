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
    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('token')
    const [currentLocation, setCurrentLocation] = useState(null);
    const [nearbyDrivers, setNearbyDrivers] = useState(null);

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
            <h1>Welcome to DeltaDrive's Homepage, {data ? data.firstName : ''}</h1>

            <button onClick={handleGetLocation}>Get Location</button>
            {currentLocation && (
                <div>
                    <p>Your Current Location:</p>
                    <p>Latitude: {currentLocation.latitude}</p>
                    <p>Longitude: {currentLocation.longitude}</p>
                    <button onClick={handleGetNearbyDrivers}>Get Nearby Drivers</button>
                </div>
            )}

            <div>
            {nearbyDrivers && (
                <div>
                    <h2>Nearby Drivers</h2>
                    <table>
                        <thead>
                        <tr>
                            {Object.keys(nearbyDrivers[0]).map((key) => (
                                <th style={{background: '#000', color:'white'}} key={key}>{key}</th>
                            ))}
                            {/*<th style={{background: '#000', color:'white'}}>REQUEST A CAR</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {nearbyDrivers.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                                <td>
                                    {/*<BookButton driver={item} currentLocation={currentLocation}></BookButton>*/}
                                    {/*<Button onClick={handleOpen}>Open modal</Button>*/}
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