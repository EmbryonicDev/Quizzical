import uniqid from 'uniqid'

export default function Trivia(props) {
  const choices = props.choices.map(choice => {

    let style;
    let opacity = 1;
    if (props.checkAnswers) {
      opacity = 0.5;
    }
    if ((props.checkAnswers && choice.isAnswer) ||
      (props.checkAnswers && choice.isAnswer && choice.isSelected)) {
      style = '#94D7A2';
      opacity = 1;
    } else if (props.checkAnswers && choice.isSelected) {
      style = '#F8BCBC';
    } else if (choice.isSelected) {
      style = '#D6DBF5';
    }

    return (
      <button
        className='answerBtn'
        key={uniqid()}
        onClick={() => props.handleSelection(choice.id, choice.masterId)}
        style={{ background: style, color: '#293264', opacity: opacity }}
      >
        {atob(choice.value)}
      </button>
    )
  })

  return (
    <div id='trivia'>
      <h4 className='trivia--question' >{props.question}</h4>
      <div className='trivia--answers'>
        {choices}
      </div>
    </div>
  )
}
