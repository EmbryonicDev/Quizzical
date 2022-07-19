import React from 'react';

export default function Trivia(props) {
  return (
    <div id='trivia'>
      <h4 className='trivia--question' >{props.question}</h4>
      <div className='trivia--answers'>
        <button className='answerBtn'></button>
        <button className='answerBtn'></button>
        <button className='answerBtn'></button>
        <button className='answerBtn'></button>
      </div>
      <hr></hr>
    </div>
  )
}