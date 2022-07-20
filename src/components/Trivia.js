import uniqid from 'uniqid';

export default function Trivia(props) {
  const buttonElms = props.allAnswers.map(answer =>
    <button className='answerBtn' key={uniqid()}>{answer}</button>
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
