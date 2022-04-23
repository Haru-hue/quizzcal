import React from "react";
import Question from "./Question"

export default function Quiz (props) {
    const questionElements = props.questions.map(item => {
        return <Question question={item.question} 
        answers={item.answers}
        correctAnswer={item.correctAnswer}
        id={item.id}
        isChecked={props.isChecked}
        key={item.id}
        selectAnswer={props.selectAnswer}/>
    })
    return (
        <>
            {questionElements}
            <div className="answer--container">
                <h3 className="checked">
                    {props.isChecked ? props.checkAnswers() : "Make sure to answer all the questions"}
                </h3>

            <button className="check--button" 
                onClick={props.isChecked ? props.resetGame : props.handleClick}>
                    {props.isChecked ? "New Game" : "Check Answers"}</button>
            </div>
        </>
    )
}