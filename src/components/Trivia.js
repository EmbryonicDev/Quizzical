export default function Trivia(props) {

  // function unSelectAll() {
  //   // clear all isSelected first to avoid multiple
  //   //  answers being selected
  //   setAnswers(prevState => prevState.map(answer => {
  //     return answer.isSelected ?
  //       { ...answer, isSelected: false } :
  //       answer
  //   }))
  // }

  // function select(id) {
  //   unSelectAll()

  //   // Highlight selected answer
  //   setAnswers(prevState => prevState.map(answer => {
  //     console.log('clicked ' + id)
  //     return (
  //       answer.id === id ?
  //         { ...answer, isSelected: !answer.isSelected } :
  //         answer
  //     )
  //   }))
  // }

  return (
    <div id='trivia'>
      <h4 className='trivia--question' >{props.question}</h4>
      <div className='trivia--answers'>
        {props.choices}
      </div>
    </div>
  )
}
