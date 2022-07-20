import StartQuiz from "./components/StartQuiz";
import Trivia from "./components/Trivia";
import blob1 from './Assets/blob5.png';
import blob2 from './Assets/blobs.png';
import { useEffect, useState } from "react";
import uniqid from 'uniqid';

function App() {
  const [firstGame, setFirstGame] = useState(true);
  const [triviaData, setTriviaData] = useState([]);

  function startFirstGame() {
    setFirstGame(prevState => !prevState)
  }

  useEffect(() => {
    !firstGame &&
      fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=base64")
        .then(res => res.json())
        .then(data => setTriviaData(data.results));
  }, [firstGame])

  function shuffleAnswers(wrongAnswers, correctAnswer) {
    const randomNum = Math.floor(Math.random() * 4);
    const allAnswers = [...wrongAnswers];
    allAnswers.splice(randomNum, 0, correctAnswer);
    return allAnswers;
  }

  const triviaElements = triviaData.map(data => {
    // Use atob() to decode base64 text
    const wrongAnswers = data.incorrect_answers.map(answer => atob(answer));
    const allAnswers = shuffleAnswers(wrongAnswers, atob(data.correct_answer))

    return (
      <Trivia
        key={uniqid()}
        question={atob(data.question)}
        allAnswers={allAnswers}
        correctAnswer={atob(data.correct_answer)}
      />)
  })

  return (
    <div className="App">
      <img className="blob1" src={blob1} alt=""></img>
      <img className="blob2" src={blob2} alt=""></img>
      {firstGame &&
        <StartQuiz startFirstGame={startFirstGame} />
      }
      {!firstGame &&
        triviaElements
      }
    </div>
  );
}

export default App;
