import React, { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import he from "he"
import "./App.css"
import { nanoid } from "nanoid";

function App () {
    const [questions, setQuestions] = useState([])
    const [count, setCount] = useState(0)
    const [game, setGame] = useState(false)
    const [isChecked, setChecked] = useState(false)

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
                    answers: answerArr.sort((a, b) => Math.random() - 0.5), //Shuffles the answer,
                    isAnswered: false,
                    correctAnswer: he.decode(item.correct_answer),
                    id: nanoid()
                }
            }))
        }
        getQuestions()
     }, [])
    
    function selectAnswer(event) {
        const clickedAnswer = (event.target.innerHTML)
        const clickedQuestion = (event.target.parentElement.parentNode.firstChild.innerHTML)

        setQuestions((prevQuiz) => 
        validateQuiz(prevQuiz, clickedAnswer, clickedQuestion))
    }
    console.log(questions)

    const validateQuiz = (questions, clickedAnswer, clickedQuestion) => 
        questions.map((question) => {
        if(question.question === clickedQuestion) {
            const updatedAnswers = question.answers.map(function(answer) {
                return answer.answer === clickedAnswer ? 
                {...answer, isSelected: true, isAnswered: true} : 
                {...answer, isSelected: false, isAnswered: false}             
                })
                  return {...question, answers:updatedAnswers, 
                    isAnswered: updatedAnswers.some(ans=> ans.isSelected)}
               } else {
                  return question
              } 
        })

    function checkAnswers () {
        const allQuestions = questions.every(question => question.isAnswered)
        if(allQuestions) {
            const correctAnswers = questions.reduce((count, question) => {
                const index = question.answers.findIndex(answer => answer.isSelected)
                const Correct = question.answers[index].isCorrectAnswer
                if(Correct) {
                   return count + 1
                }
                return count
            })
            setCount(correctAnswers)
            console.log(`You got ${count}/5 questions right`)
        } else {
            return "Make sure to answer all the questions"
        }
    }

    function toggleCheck () {
        setChecked(prev => !prev)
    }

    function handleClick () {
        if(questions.every(question => question.isAnswered)) toggleCheck()
    }
        

    return (
        <main>
        <div className="circle--top"></div>
            <Quiz questions={questions}
            selectAnswer={selectAnswer}
             />
             {/* {isChecked ? checkAnswers() : "Make sure to answer all the questions"} */}
           <div className="answer--container">
                <button 
                        className="check--button"
                        onClick={checkAnswers}
                        >Check answers</button>
           </div>
        <div className="circle--bottom"></div>
        </main>
    )
}

export default App