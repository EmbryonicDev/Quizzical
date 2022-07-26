import React from 'react';

export default function StartQuiz(props) {
  return (
    <div id='startQuiz'>
      <h1 id='startQuiz--title'>Quizzical</h1>
      <p id='startQuiz--description'>
        Test your knowledge on details, considerations, & pieces of information of little importance or value 😋...
      </p>
      <button
        id='startQuiz--btn'
        className='button'
        onClick={props.startFirstGame}
      >Start Quiz</button>
    </div>
  )
}
