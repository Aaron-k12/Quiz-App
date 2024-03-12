import React, { useState } from "react"
import Home from "./components/Home"
import Question from "./components/Question"


function App() {
    // display home page
    const [showQuestions, setShowQuestions] = useState(false)

    return(
        <main className="main-section">
            {showQuestions ? (<Question />) :
            <Home setShowQuestions={setShowQuestions} />}
        </main>
    )
}

export default App