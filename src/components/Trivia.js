import { useState } from 'react';
import uniqid from 'uniqid';

export default function Trivia(props) {
  const [answers, setAnswers] = useState(getNewAnswers())

  function getNewAnswers() {
    const newAnswers = [];
    for (let i = 0; i < 4; i++) {
      newAnswers.push({
        value: props.allAnswers[i],
        isSelected: false,
        id: uniqid(),
      })
    }
    return newAnswers
  }

  function unSelectAll() {
    // clear all isSelected first to avoid multiple
    //  answers being selected
    setAnswers(prevState => prevState.map(answer => {
      return answer.isSelected ?
        { ...answer, isSelected: false } :
        answer
    }))
  }

  function select(id) {
    unSelectAll()

    // Highlight selected answer
    setAnswers(prevState => prevState.map(answer => {
      console.log('clicked ' + id)
      return (
        answer.id === id ?
          { ...answer, isSelected: !answer.isSelected } :
          answer
      )
    }))
  }

  const buttonElms = answers.map(answer =>
    <button
      className='answerBtn'
      key={uniqid()}
      onClick={() => select(answer.id)}
      style={{ background: answer.isSelected ? '#D6DBF5' : '#FFFFFF' }}
    >
      {answer.value}
    </button>
  );

  return (
    <div id='trivia'>
      <h4 className='trivia--question' >{props.question}</h4>
      <div className='trivia--answers'>
        {buttonElms}
      </div>
    </div>
  )
}
