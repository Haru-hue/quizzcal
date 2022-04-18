import React from "react";

function Answer(props) {
    return (
        <button
            className={props.isSelected ? "selected" : ""}
            onClick={props.selectAnswer}
        >{props.answer}</button>
    )
}

export default Answer