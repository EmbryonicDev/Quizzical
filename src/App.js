import StartQuiz from "./components/StartQuiz";
import Trivia from "./components/Trivia";
import blob1 from './Assets/blob5.png';
import blob2 from './Assets/blobs.png';
import { useEffect, useState } from "react";
import uniqid from 'uniqid';

function App() {
  const [firstGame, setFirstGame] = useState(true);
  const [triviaData, setTriviaData] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [score, setScore] = useState(0);

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
        choices: choicesToObj(allChoices, id, data.correct_answer),
        answer: data.correct_answer,
        id: id,
        isCorrect: false,
        selectedAnswer: null,
        question: data.question,
      }
    })
  }

  function choicesToObj(choices, masterId, correctAnswer) {
    const newChoices = [];
    for (let i = 0; i < 4; i++) {
      newChoices.push({
        value: choices[i],
        isSelected: false,
        id: uniqid(),
        masterId: masterId,
        isAnswer: choices[i] === correctAnswer ? true : false
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

  function handleSelection(id, masterId) {
    // Unselect all answers first to avoid multiple answer selections
    selectAnswer(id, masterId, false);
    // Select answer
    selectAnswer(id, masterId, true);

    function selectAnswer(id, masterId, onOrOff) {
      let conditionToTest

      setTriviaData(prevState => prevState.map(triviaObj => {
        let newChoices;

        if (triviaObj.id === masterId) {
          newChoices = triviaObj.choices.map(choice => {

            onOrOff ?
              conditionToTest = choice.id === id :
              conditionToTest = choice.id !== id && choice.isSelected

            return (
              conditionToTest ?
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
  }

  function showAnswers() {
    console.log('checking answers')
    setCheckAnswers(prevState => !prevState);
    getScore()
  }

  function getScore() {
    triviaData.map(triviaObj => {
      triviaObj.choices.map(choice => {
        if (choice.isSelected && choice.isAnswer) {
          setScore(prevState => prevState + 1)
        }
        return true
      })
      return true
    })
  }

  const triviaElements = triviaData.map(data => {
    const choicesElmts = data.choices.map(choice => {

      let style;
      let opacity = 1;
      if (checkAnswers) {
        opacity = 0.5;
      }
      if (checkAnswers && choice.isSelected) {
        style = '#F8BCBC';
      } else if ((checkAnswers && choice.isAnswer) ||
        (checkAnswers && choice.isAnswer && choice.isSelected)) {
        style = '#94D7A2';
        opacity = 1;
      } else if (choice.isSelected) {
        style = '#D6DBF5';
      }

      return (
        <button
          className='answerBtn'
          key={uniqid()}
          onClick={() => handleSelection(choice.id, choice.masterId)}
          style={{ background: style, color: '#293264', opacity: opacity }}
        >
          {atob(choice.value)}
        </button>
      )
    })

    return (
      // Use atob() to decode base64 text
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
      <div id='checkOrNext'>
        {
          checkAnswers &&
          <h4
            className="scoreText"
          >
            {`You scored ${score}/${triviaData.length} correct answers`}
          </h4>
        }
        {
          !firstGame &&
          <button
            id='App--checkBtn'
            className='button'
            onClick={showAnswers}
          >
            {!checkAnswers ? "Check Answers" : "Play Again"}
          </button>
        }
      </div>
    </div>
  );
}

export default App;
