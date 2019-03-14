import React from 'react';
import classes from './ActiveQuize.css'
import AnswerList from './AnswersList/AnswerList.js'



 const ActiveQuiz = (props) => {

return (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{props.activeQuestion}.</strong>&nbsp;
        {props.question}
      </span>
      <small> {props.activeQuestion} из {props.quizLength}</small>
    </p>
   <AnswerList answers={props.answers}
               onAnswerClick={props.onAnswerClick}
               state={props.state}
   />
  </div>


)
};

export default ActiveQuiz;