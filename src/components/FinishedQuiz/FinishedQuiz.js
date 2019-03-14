import React, {Component} from 'react';
import classes from './FinishedQuiz.css';

const FinishQuiz = (props) => {
  return (<div className={classes.FinishedQuiz}>
    <ul>
      <li>
        <strong>
          1.
        </strong>
        lalala
        <i className={'fa fa-times ' + classes.error}/>
      </li>

      <li>
        <strong>
          1.
        </strong>
        lalala
        <i className={'fa fa-check ' + classes.success}/>
      </li>
    </ul>

    <p>
      правильно 4 из 10
    </p>
    <div>
      <button>повторить</button>
    </div>
  </div> )
};
export default FinishQuiz;