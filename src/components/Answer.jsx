import React from "react";

function Answer(props) {
    function handleClick () {
        props.selectAnswer()
    }
    return (
        <button
            className={props.isSelected ? "selected" : ""}
            onClick={handleClick}
            id={props.id}
            key={props.id}
        >{props.answer}</button>
    )
}

export default Answer