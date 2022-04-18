import React, { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import he from "he"
import "./App.css"
import { nanoid } from "nanoid";

function App () {
    const [questions, setQuestions] = useState([])
    
    useEffect(()=> {
        async function getQuestions () {
            const res = await fetch ("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
            const data = await res.json()
            setQuestions(data.results.map(item => {
                item.incorrect_answers.push(item.correct_answer)
                const answerArr = item.incorrect_answers.map(answer => {
                    return {
                        answer: he.decode(answer),
                        isCorrectAnswer: answer === item.correct_answer, //Checking if answer is the right one
                        isSelected: false,
                        handleClick: {selectAnswer},
                        id: nanoid()
                    }
                })
                return {
                    question: he.decode(item.question),
                    answers: answerArr.sort((a, b) => Math.random() - 0.5), //Shuffles the answer
                    correctAnswer: he.decode(item.correct_answer),
                    id: nanoid()
                }
            }))
        }
        getQuestions()
    }, [selectAnswer])
    function selectAnswer(event) {
        const clickedAnswer = (event.target.innerHTML)
        const clickedQuestion = (event.target.parentElement.firstChild.innerHTML)

            const updatedQuiz = questions.map(function(question) {
                if(question.question === clickedQuestion) {
                    const updatedAnswers = question.answers.map(function(answer) {
                        if(answer.text === clickedAnswer) {
                            return{...answer, isSelected:true}
                        } else {
                           return{...answer, isSelected:false}
                        }                     
                    })
                    return{...question, answers:updatedAnswers}
                } else {
                    return{...question}
                } 
        })
        setQuestions(prevQuiz => updatedQuiz)
    }
    return (
        <Quiz questions={questions}
            selectAnswer={selectAnswer}
             />
    )
}

export default App