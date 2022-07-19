import StartQuiz from "./components/StartQuiz";
import blob1 from './Assets/blob5.png';
import blob2 from './Assets/blobs.png';
import { useState } from "react";


function App() {
  const [firstGame, setFirstGame] = useState(true);

  function startFirstGame() {
    setFirstGame(prevState => !prevState)
  }

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
