import React, { useState } from "react";

function CommentBox() {
    const [comment, setComment] = useState("");

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Process and save the comment data here (e.g., send it to a server).
        console.log("Submitted Comment:", comment);
        // You can clear the comment box here if needed.
        setComment("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
        <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your comment here..."
            rows={4} // Specify the number of rows for the textarea
            cols={40} // Specify the number of columns for the textarea
        />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CommentBox;