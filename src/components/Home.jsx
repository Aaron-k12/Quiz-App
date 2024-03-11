
function Home(props) {

    return (
        <section className="home-section">
            <div className="first-page">
                <h1 className="app-title">Quizzical</h1>
                <p className="description">Some description if needed</p>
                <button onClick={()=> props.handleStartQuiz()} className="start-btn">Start Quiz</button>
            </div>
        </section>
    )
}



export default Home