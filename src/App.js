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
    }, [])

    function selectAnswer (answerId) {
        setQuestions(prev => {
            return prev.map(ques=> {
                const newAnswers = ques.answers.map(ans => {
                   return ans.id === answerId ? {...ans, isSelected: !ans.isSelected} : ans
                })
                return {
                    ...ques,
                    answers: newAnswers
                }
            })
        })
    }
    selectAnswer()
    return (
        <Quiz questions={questions}
              selectAnswer={selectAnswer}
              />
    )
}

export default App