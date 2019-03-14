import React from 'react';
import classes from './AnswerList.css';
import AnswerItem from './AswerItem/AnswerItem.js';

const AnswersList = (props) => {

  return (
    <ul className={classes.AnswerList}>
      {
        props.answers.map((answer, index)=>{
          return (<AnswerItem
            key={index}
            answer={answer}
            onAnswerClick={props.onAnswerClick}
            state={props.state?props.state[answer.id] : null}
          />)
      })
      }
    </ul>
  )
};
export default AnswersList;