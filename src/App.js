import React, { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import he from "he"
import "./App.css"
import { nanoid } from "nanoid";

function App () {
    const [questions, setQuestions] = useState([])
    const [quiz, setQuiz] = useState(false)
    
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
                        isAnswered: false,
                        id: nanoid()
                    }
                })
                return {
                    question: he.decode(item.question),
                    answers: answerArr.sort((a, b) => Math.random() - 0.5), //Shuffles the answer
                    correctAnswer: he.decode(item.correct_answer),
                    isAnswered: false,
                    id: nanoid()
                }
            }))
        }
        getQuestions()
    },[])

    function selectAnswer(event) {
        const clickedAnswer = (event.target.innerHTML)
        const clickedQuestion = (event.target.parentElement.parentNode.firstChild.innerHTML)
            const updatedQuiz = questions.map(function(question) {
                if(question.question === clickedQuestion) {
                    const updatedAnswers = question.answers.map(function(answer) {
                        return answer.answer === clickedAnswer ? 
                        {...answer, isSelected: true, isAnswered: true} : 
                        {...answer, isSelected: false, isAnswered: false}             
                    })
                    return {...question, answers:updatedAnswers, isAnswered: true}
                } else {
                    return {...question, isAnswered: false}
                } 
        })
        setQuestions(prevQuiz => updatedQuiz)
    }

    
    useEffect(()=> {
        const allQuestions = questions.every(item => item.isAnswered)
        console.log("All:" + allQuestions)
        // if(allQuestions) {
        //     console.log("True")
        // }
    }, [questions]) 
   

    function checkAnswers () {
        return quiz ? console.log("Answers checked") : console.log("You have not answered all questions")
    }

    return (
        <main>
            <div className="circle--top"></div>
            <Quiz questions={questions}
            selectAnswer={selectAnswer}
             />
             <button 
                className="check--button"
                onClick={checkAnswers}
                >Check answers</button>
             <div className="circle--bottom"></div>
        </main>
    )
}

export default App