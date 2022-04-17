import React from "react";
import Question from "./Question"

export default function Quiz (props) {
    const questionElements = props.questions.map(item => {
        return <Question question={item.question} 
        answers={item.answers}
        correctAnswer={item.correctAnswer}
        selectAnswer={item.selectAnswer}
        id={item.id}
        key={item.id}/>
    })
    return (
        <>
            {questionElements}
        </>
    )
}