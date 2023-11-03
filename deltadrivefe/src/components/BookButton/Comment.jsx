import React, { useState } from "react";
import {rateRide} from "../../Service/RideService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";

function CommentBox(props) {
    const [comment, setComment] = useState("");
    const rideId = props.rideId;
    const review = props.review;
    const navigate = useNavigate();
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Process and save the comment data here (e.g., send it to a server).
        console.log("Submitted Comment:", comment);
        console.log("Review: ", props.review);

        try{
            let response = await rateRide(rideId, review, comment).then(async () => {
                toast.success("Request Accepted");
                await delay(5000);
                navigate("/");
            }).catch(() => {
                toast.error("Please rate the driver (:");
            })


        } catch(error) {
            console.log("API Error: ", error);
        }
        // You can clear the comment box here if needed.
        setComment("");

    };

    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
        <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your comment here..."
            rows={4} // Specify the number of rows for the textarea
            cols={40} // Specify the number of columns for the textarea
        />

                <div>
                    <button className="btn btn-dark" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default CommentBox;