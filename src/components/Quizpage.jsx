
// decodes hmtl entities
import he from "he"

function Quizpage(props) {   
  function clickAnswer(currentQuestion, answer) {
   
    props.updateAnswer(currentQuestion, answer);
  }

  // answers elements
  const answersElements = props.answers.map((answer, index) => {
    return (
      <button
        key={index}
        // update setQuestionsAndAnswers state
        onClick={() => clickAnswer(props.question, answer)}
        className={`answer-btn ${
          // function highlights selected answer
          answer === props.selectedAnswer ? "selected" : ""
        }
        ${
          // checks if answer is correct
          props.showResult && answer === props.correctAnswer ? "correct" : ""}
        ${
          // checks if answer is incorrect
          props.showResult &&
          answer === props.selectedAnswer &&
          answer !== props.correctAnswer
            ? "incorrect"
            : ""
        }
        ${ // dims all answer elements
          props.showResult && answer !== props.correctAnswer ? 
          "dimmed" : ""
        }
        `}
        // disables buttons when result is displayed
        disabled={props.showResult}
      >
        {he.decode(answer)}
      </button>
    );
  });

  return (
    <div className="question-container">
      <h3 className="question">{he.decode(props.question)}</h3>
      <div className="answers-btn-container">{answersElements}</div>
    </div>
  )
}

export default Quizpage
