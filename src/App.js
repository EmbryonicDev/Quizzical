import StartQuiz from "./components/StartQuiz";
import blob1 from './Assets/blob5.png';
import blob2 from './Assets/blobs.png';


function App() {
  return (
    <div className="App">
      <img className="blob1" src={blob1} alt=""></img>
      <StartQuiz />
      <img className="blob2" src={blob2} alt=""></img>
    </div>
  );
}

export default App;
