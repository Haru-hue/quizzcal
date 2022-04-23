import React from "react"
import Answer from "./Answer"

function Question(props) {
    const AnswerArr = props.answers.map(item => {
        return <Answer answer={item.answer}
                isSelected={item.isSelected}
                selectAnswer={props.selectAnswer}
                isCorrectAnswer={item.isCorrectAnswer}
                isChecked={props.isChecked}
                id={item.id} key={item.id}/>
    })
    return (
        <section className = "question--container">
            <h3 className="question--title">{props.question}</h3>
            <div className="answer--container">
                {AnswerArr}
            </div>
        </section>
    )
}

export default Question