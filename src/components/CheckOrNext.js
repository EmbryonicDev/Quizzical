import React from 'react';

export default function CheckOrNext(props) {
  return (
    <div id='checkOrNext'>
      {
        props.checkAnswers &&
        <h4
          className="scoreText"
        >
          {`You scored ${props.score}/${props.triviaData.length} correct answers`}
        </h4>
      }
      {
        (!props.firstGame && props.triviaData.length > 0) &&
        <button
          id='App--checkBtn'
          className='button'
          onClick={!props.checkAnswers ? props.showAnswers : props.startNextGame}
        >
          {!props.checkAnswers ? "Check Answers" : "Play Again"}
        </button>
      }
    </div>
  )

}