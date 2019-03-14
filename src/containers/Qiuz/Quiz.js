import React, {Component} from 'react';
import classes from './Quiz.css';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.js'

class Quiz extends Component {
  state = {
    quiz: [
      {answers:[{text: 'question1'}, {text: 'question2'}, {text: 'question3'}, {text: 'question4'}]}
    ]
};

  render (){
    return (
      <div className={classes.Quiz}>

        <div className={classes["Quiz-wrapper"]}>
          <h1>
            Ответьте на все вопросы
          </h1>
        <ActiveQuiz answers = {this.state.quiz[0].answers}/>
        </div>
      </div>
    )
  }

}
export default Quiz;