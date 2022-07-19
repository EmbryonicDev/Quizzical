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
  console.log(triviaData)

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple&encode=base64")
      .then(res => res.json())
      .then(data => setTriviaData(data.results))
  }, [firstGame])

  const triviaElements = triviaData.map(data => {
    // atob() decodes a Base64-encoded string
    const answers = data.incorrect_answers;
    answers.push(data.correct_answer);
    const decodedAnswers = [];
    answers.forEach(element => {
      decodedAnswers.push(atob(element))
    });

    return (
      <Trivia
        key={uniqid()}
        question={atob(data.question)}
        answers={decodedAnswers}
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
