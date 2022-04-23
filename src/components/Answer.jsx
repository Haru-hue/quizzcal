import React from "react";

const correctStyles = {
    backgroundColor: "lightgreen",
    color:  "#414535",
    cursor: "default"     
}

const incorrectStyles = {
    opacity: 0.6,
    color: "#414535",
    backgroundColor: "#96BBBB",
    cursor: "default"
}

const chosenIncorrectStyles = {
    ...incorrectStyles,
    backgroundColor: "pink",
    color: "#414535"        
}

function Answer(props) {
    function chooseStyle() {
        if(!props.isChecked) return{}
        if (props.isCorrectAnswer) return correctStyles
        if (props.isSelected) return chosenIncorrectStyles
        return incorrectStyles
    }

    console.log(props)

    return (
        <button
            className={`answer--button ${props.isSelected ? "selected" : ""}`}
            onClick={!props.isChecked ? (event) => {props.selectAnswer(event)} : undefined}
            style={chooseStyle()}
        >{props.answer}</button>
    )
}

export default Answer