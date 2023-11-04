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
        <span>
            {/*{console.log(currentLocation)}*/}
            <Button style={{width: '100px', background: '#164372', color: 'white',  fontWeight: 700}} onClick={handleOpen}>Book now</Button>
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
                        Driver name: {driver.FirstName} {driver.LastName}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Typography style={{display: 'block'}} component={'span'} variant={'body2'}>Car: {driver.Brand}</Typography>
                        <Typography style={{display: 'block'}} component={'span'} variant={'body2'}>Price per KM: {driver.PricePerKm.toFixed(2)} EUR</Typography>
                        <span>Destination [LATITUDE]</span>
                        <input onChange={handleLATChange}></input>
                        <span>Destination [LONGITUDE]</span>
                        <input onChange={handleLONChange}></input>
                    </Typography>
                    <Typography id="modal-modal" component={'span'} variant={'body2'}>
                        <BookButton handleClose={handleClose} driver={driver} currentLocation={currentLocation} latitude={destLatitude} longitude={destLongitude}></BookButton>
                    </Typography>
                </Box>
            </Modal>
        </span>

    )
}

export default BookModal;