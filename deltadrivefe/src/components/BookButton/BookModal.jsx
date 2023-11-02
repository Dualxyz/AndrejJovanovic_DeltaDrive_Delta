import React, {useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import BookButton from "./BookButton";

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

const BookModal = (props) => {
    const driver = props.driver;
    const currentLocation = props.currentLocation;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [destLatitude, setDestLatitude] = useState("");
    const [destLongitude, setDestLongitude] = useState("");

    const handleLATChange = (e) => {
        setDestLatitude(e.target.value);
        // console.log(destLatitude);
    };

    const handleLONChange = (e) => {
        setDestLongitude(e.target.value);
        // console.log(destLongitude);
    };

    return(
        <div>
            {/*{console.log(currentLocation)}*/}
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // slotDrop.backdrop={{ style: { backgroundColor: "0, 0, 0, 0.1" } }}
                BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Booking {driver.FirstName} {driver.LastName}?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <p>Car: {driver.Brand}</p>
                        <p>Price per KM: {driver.PricePerKm} EUR</p>
                        <label>DestLAT</label>
                        <input onChange={handleLATChange}></input>
                        <label>DestLON</label>
                        <input onChange={handleLONChange}></input>
                    </Typography>
                    <Typography id="modal-modal">
                        <BookButton driver={driver} currentLocation={currentLocation} latitude={destLatitude} longitude={destLongitude}></BookButton>
                    </Typography>
                </Box>
            </Modal>
        </div>

    )
}

export default BookModal;