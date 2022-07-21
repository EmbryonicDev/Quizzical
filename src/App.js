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
        .then(data => setTriviaData(getTriviaData(data.results)));
  }, [firstGame])

  function getTriviaData(data) {
    return data.map(data => {
      const id = uniqid();
      const allChoices = shuffleAnswers(data.incorrect_answers, data.correct_answer);
      return {
        choices: choicesToObj(allChoices, id),
        answer: data.correct_answer,
        id: id,
        isCorrect: false,
        selectedAnswer: null,
        question: data.question,
      }
    })
  }

  function choicesToObj(choices, masterId) {
    const newChoices = [];
    for (let i = 0; i < 4; i++) {
      newChoices.push({
        value: choices[i],
        isSelected: false,
        id: uniqid(),
        masterId: masterId
      })
    }
    return newChoices
  }

  console.log(triviaData)

  function shuffleAnswers(wrongAnswers, correctAnswer) {
    const randomNum = Math.floor(Math.random() * 4);
    const allAnswers = [...wrongAnswers];
    allAnswers.splice(randomNum, 0, correctAnswer);
    return allAnswers;
  }

  function selectAnswer(id, masterId) {
    setTriviaData(prevState => prevState.map(triviaObj => {
      let newChoices;

      if (triviaObj.id === masterId) {
        newChoices = triviaObj.choices.map(choice => {
          return (
            choice.id === id ?
              { ...choice, isSelected: !choice.isSelected } :
              choice
          )
        })
      }

      return (
        triviaObj.id === masterId ?
          { ...triviaObj, choices: newChoices } :
          triviaObj
      )
    }))
  }

  const triviaElements = triviaData.map(data => {
    // Use atob() to decode base64 text

    const choicesElmts = data.choices.map(choice =>
      <button
        className='answerBtn'
        key={uniqid()}
        onClick={() => selectAnswer(choice.id, choice.masterId)}
        style={{ background: choice.isSelected ? '#D6DBF5' : '#FFFFFF' }}
      >
        {atob(choice.value)}
      </button>
    )

    return (
      <Trivia
        key={uniqid()}
        question={atob(data.question)}
        choices={choicesElmts}
        correctAnswer={atob(data.answer)}
      />)
  })

  return (
    <div className="App">
      <img className="blob1" src={blob1} alt=""></img>
      <img className="blob2" src={blob2} alt=""></img>
      {
        firstGame &&
        <StartQuiz startFirstGame={startFirstGame} />
      }
      {
        !firstGame &&
        triviaElements
      }
      {
        !firstGame &&
        <button
          id='App--checkBtn'
          className='button'
        >
          Check Answers
        </button>
      }
    </div>
  );
}

export default App;
