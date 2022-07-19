import React from 'react';

export default function Trivia(props) {
  return (
    <div id='trivia'>
      <h4 className='trivia--question' >{props.question}</h4>
      <div className='trivia--answers'>
        <button className='answerBtn'>{props.answers[0]}</button>
        <button className='answerBtn'>{props.answers[1]}</button>
        <button className='answerBtn'>{props.answers[2]}</button>
        <button className='answerBtn'>{props.answers[3]}</button>
      </div>
      <hr></hr>
    </div>
  )
}