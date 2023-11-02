import React from "react";

const BookButton = (props) => {

    const bookRidehandler = () => {
        console.log(props.value);
    }

    return(
        <button className="btn btn-dark" onClick={bookRidehandler}> BOOK </button>
    )
}

export default BookButton;