import React from 'react';
import classes from './FinishedQuiz.css';
import Button from '../UI/Button/Button.js';
import {Link} from 'react-router-dom'
const FinishQuiz = (props) => {
  console.log(props.results);
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);
  return (<div className={classes.FinishedQuiz}>
    <ul>
      {props.quiz.map((quizItem, index) => {
          const cls = ['fa', props.results[index] === 'error' ? 'fa-times' : 'fa-check', classes[props.results[index]]];
          return (
            <li key={index}>
              <strong>{index + 1}</strong>. &nbsp;
              {quizItem.question}
              <i className={cls.join(' ')}/>
            </li>
          )
        }
      )
      }
    </ul>

    <p>
      правильно {successCount} из {props.quiz.length}
    </p>
    <div>
      <Button onClick={props.onReTry} type='primary'>повторить</Button>
      <Link to="/">
      <Button  type='success'>Перейти в список тестов</Button>
      </Link>
    </div>
  </div>)
};
export default FinishQuiz;