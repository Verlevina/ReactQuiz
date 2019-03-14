import React from 'react';
import classes from './ActiveQuize.css'
import AnswerList from './AnswersList/AnswerList.js'



 const ActiveQuiz = (props) => {
return (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>2.</strong>&nbsp;
        How are you?
      </span>
      <small> 4 из 12</small>
    </p>
   <AnswerList answers={props.answers}/>
  </div>


)
};

export default ActiveQuiz;