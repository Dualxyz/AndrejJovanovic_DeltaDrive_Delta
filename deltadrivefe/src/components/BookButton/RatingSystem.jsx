import React, { Component } from "react";
import EmptyStar from "../../Assets/empty-star.svg"
import FilledStar from "../../Assets/filled-star.svg"

class RatingSystem extends Component {
    constructor(props) {
        super(props);
        this.state = { currRating: 0 };
        this.onHover = this.onHover.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onHover(e) {
        if (e.target.className === "star") {
            this.setRating(e.target.dataset.value);
        }
    }

    onClick(e) {
        if (e.target.dataset.value === this.state.currRating) {
            this.setRating(e.target.dataset.value);
            console.log("Test: " + e.target.dataset.value);
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

// const RatingSystem = (props) => {
//     return (
//         <div>
//             <h1>5 star rating system</h1>
//             <h2>Select a rating:</h2>
//             <div className="rating">
//                 <RatingSystem starCount={props.starCount} />
//             </div>
//         </div>
//     );
// };

export default RatingSystem;

// export default function App() {
//     return (
//         <div className="App">
//             <RatingSystem starCount={5} />
//         </div>
//     );
// }
