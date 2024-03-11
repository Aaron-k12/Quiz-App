import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import Quizpage from './components/Quizpage'
import { nanoid } from 'nanoid'
import './index.css'

function App() {
  // Display questions to start quiz
  const [showQuestion, setShowQuestion] = useState(false)

  // Initialized with questions from the API
  const [question, setQuestion] = useState("")
  
  // Initialize array with questions and selected answers
  const [selectedAnswer, setSelectedAnswer] = useState("")

  useEffect(() => {
    const fetchData = async() => {
          const response = await fetch("https://opentdb.com/api.php?amount=5")
          const questions = await response.json()
          const questionArray = questions.results.map(questionDetails => {
                    
                    const answerArr = questionDetails.incorrect_answers
                    const correctAnswer= questionDetails.correct_answer
                    
                    // Inserting correct answer from a different position in the array into the answers array
                    const randomIndex = Math.floor(Math.random() * (answerArr.length + 1))
                    answerArr.splice(randomIndex, 0, correctAnswer)
                  return {
                    id: nanoid(),
                    question: questionDetails.question,
                    correctAnswer: questionDetails.correct_answer,
                    incorrect_answers: answerArr,
                    selected_answer: ""
                  }
      })
      setQuestion(questionArray)
  }
      

   return fetchData
    }, [question])

  // renders page to view quizzes
  function showQuiz() {
    setShowQuestion(prevState => !prevState)
  }
  

  function checkAnswer(e, answerID, correctAnswer) {
  
  question.map(eachQuestion => {
    if (selectedAnswer === eachQuestion.id) {
      e.target.style.backgroundColor = "#D6DBF5"
    }
  })
  // question.map(eachQuestion => {
  //   if (eachQuestion.id === document.getElementById(`${eachQuestion.id}`).id) {
  //     eachQuestion.incorrect_answers.map((answers, index) => {
  //       if (e.target.innerText && indexs === index) {
  //         e.target.style.backgroundColor = "#D6DBF5"
  //       }
  //     })
  //   }
//})
   //e.target.style.backgroundColor = "#D6DBF5";
    // set an array here and update it any time the user chooses an answer
    // console.log(correctAnswer)
    // console.log(e.target.innerText)
    // if (e.target.innerText === correctAnswer) {
    //   console.log("correct answer")
    // } else 
    // console.log("incorrect")
  }
  


return (
    <>
       {showQuestion && question ? <Quizpage question={question} handleClick={checkAnswer} /> : 
       <Home handleStartQuiz={showQuiz} /> }
    </>
  
  )
}

export default App
