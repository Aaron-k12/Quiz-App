import React, { useState, useEffect } from 'react'
import Quizpage from './Quizpage'

function Question() {
  // Initialized with questions from the API
  const [questions, setQuestions] = useState([])
  
  // Mapping each question and it answers
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([])

  //display warning if not all questions are answered
  const [showWarning, setShowWarning] = useState(false)

  // count correct answer to determine score
  const [score, setScore] = useState(0)

  // Display result
  const [showFinalResult, setShowFinalResult] = useState(false)

  useEffect(() => {
    if (questions.length === 0) {
      fetch("https://opentdb.com/api.php?amount=5")
        .then((response) => response.json())
        .then((data) => { 
          setQuestions(data.results)
        
          // updates questionsAndAnswers with shuffled answers
          setQuestionsAndAnswers(
            data.results.map((questionObject) => {
              return {
                question: questionObject.question,
                shuffledAnswers: shuffle([
                  ...questionObject.incorrect_answers,
                  questionObject.correct_answer
                ]),
                correctAnswer: questionObject.correct_answer,
                selectedAnswer: ""
              }
            })
          )
        })
    }
  }, [questions])

// function for inserting item of different index into another index
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }

    return array;
  }

  // select answer
  function updateAnswer(currentQuestion, answer) {
    // enables one answer to be selected
    setQuestionsAndAnswers(
      questionsAndAnswers.map((questionObject) => {
        return questionObject.question === currentQuestion ?
                {...questionObject, selectedAnswer: answer} :
                questionObject
      })
    ) 
  }

  // function to check all questions have been answered
function checkAnswers() {
  const allQuestionsAnswered = questionsAndAnswers.some(
    (questionObject) => questionObject.selectedAnswer === ""
  )
  
  // displays warning
  setShowWarning(allQuestionsAnswered)

   // updates users score
  if(!allQuestionsAnswered) {
    questionsAndAnswers.forEach(questionObject => {
      if (questionObject.selectedAnswer === questionObject.correctAnswer) {
        setScore(
          prevScore => prevScore + 1
        )
      }
    })
    // display final result
    setShowFinalResult(true)
  }
}

// restarts the quiz
function restartQuiz() {
  setQuestions([])
  setQuestionsAndAnswers([])
  setShowFinalResult(false)
  setScore(0)
}

 
  const renderQuiz = questionsAndAnswers.map((questionObject, index) => {
    return (
      <Quizpage 
       key ={index}
       question={questionObject.question}
       answers = {questionObject.shuffledAnswers}
       selectedAnswer={questionObject.selectedAnswer}
        correctAnswer={questionObject.correctAnswer}
        showResult={showFinalResult}
        updateAnswer={updateAnswer}
      />
    )
  })

return (
    <section>
        <div className="render-quiz">{ renderQuiz }</div>
    <div>
      {showWarning && (
        <p>There are questions not answered</p>
      )}

     {questions.length > 0 && !showFinalResult ? 
       (<button onClick={checkAnswers} className="btn check-btn">
             check answers
       </button>
       ):null
       }
      </div>

      {showFinalResult && (
        <div className="display-results">
          <p className="total-score">you scored { score }/5 correct answers</p>
          <button onClick={restartQuiz} className="btn play-again-btn">Play Agiain </button>          
        </div>
      )}  
    </section>
  
  )
}

export default Question


