import React from "react";

function Answer(props) {
    return (
        <button
            className={`answer--button ${props.isSelected ? "selected" : ""}`}
            onClick={props.selectAnswer}
        >{props.answer}</button>
    )
}

export default Answer