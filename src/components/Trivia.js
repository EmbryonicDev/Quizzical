export default function Trivia(props) {
  return (
    <div id='trivia'>
      <h4 className='trivia--question' >{props.question}</h4>
      <div className='trivia--answers'>
        {props.choices}
      </div>
    </div>
  )
}
