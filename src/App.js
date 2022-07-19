import StartQuiz from "./components/StartQuiz";
import blob1 from './Assets/blob5.png';
import blob2 from './Assets/blobs.png';
import { useEffect, useState } from "react";


function App() {
  const [firstGame, setFirstGame] = useState(true);
  const [triviaData, setTriviaData] = useState([]);

  function startFirstGame() {
    setFirstGame(prevState => !prevState)
    console.log(triviaData)
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
      .then(res => res.json())
      .then(data => setTriviaData(data.results))
  }, [firstGame])

  return (
    <div className="App">
      <img className="blob1" src={blob1} alt=""></img>
      {firstGame &&
        <StartQuiz startFirstGame={startFirstGame} />
      }
      <img className="blob2" src={blob2} alt=""></img>
    </div>
  );
}

export default App;
