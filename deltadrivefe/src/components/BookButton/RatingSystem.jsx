import React, { Component } from "react";
import EmptyStar from "../../Assets/empty-star.svg"
import FilledStar from "../../Assets/filled-star.svg"
import {bookRide, rateRide} from "../../Service/RideService";

class RatingSystem extends Component {
    constructor(props) {
        super(props);
        this.state = { currRating: 0 };
        this.onHover = this.onHover.bind(this);
        this.onClick = this.onClick.bind(this);
        this.rideId = props.rideId;
        this.setReview = props.setReview;
    }

    onHover(e) {
        if (e.target.className === "star") {
            this.setRating(e.target.dataset.value);
        }
    }

    async onClick(e) {
        if (e.target.dataset.value === this.state.currRating) {
            this.setRating(e.target.dataset.value);
            console.log("RideID: " + this.rideId);
            this.setReview(e.target.dataset.value);
            // let response = await rateRide(e.target.dataset.value);
            // console.log("Test: " + response);
        }
    }

    setRating(value) {
        this.setState({ currRating: value });
    }

    render() {
        return [...Array(this.props.starCount).keys()].map((index) => {
            return (
                <img
                    data-value={index + 1}
                    className="star"
                    key={index+1}
                    onMouseOver={this.onHover}
                    onClick={this.onClick}
                    src={index + 1 <= this.state.currRating ? FilledStar : EmptyStar}
                    alt={
                        index + 1 <= this.state.currRating ? "filled star" : "empty star"
                    }
                />
            );
        });
    }
}

export default RatingSystem;

