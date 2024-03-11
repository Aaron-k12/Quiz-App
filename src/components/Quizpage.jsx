import he from "he"

export default function Quizpage(props) {    
   const mainPage = props.question.map((eachQuestion, index) => (
                <div className="main-section" key={eachQuestion.id} id={eachQuestion.id}>
                   
                    <p className="question">{he.decode(eachQuestion.question)}</p>
                    <ul className="answer-list">
                        {eachQuestion.incorrect_answers.map((answer, index) => (
                        <li key={index} id={`${index}`}  onClick={(e) => props.handleClick(e, eachQuestion.id, eachQuestion.correctAnswer)}>
                            {/* <label>
                                <input type="radio" name={`question_${index}`} value={answer} />
                                {he.decode(answer)}
                            </label> */}
                            {he.decode(answer)}
                        </li>
                                ))}
                    </ul>                
                </div>

   ))

    return (
        <main>
         {mainPage}
         <button className="check-answers" type="submit">Check answers</button>
        </main>
        
    )
}