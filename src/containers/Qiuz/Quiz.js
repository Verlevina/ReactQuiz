import React, {Component} from 'react';
import classes from './Quiz.css';
import FinishQuiz from '../../components/FinishedQuiz/FinishedQuiz.js'

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.js'

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    isFinished: true,
    quiz: [
      { question:'Сколько секунд в минуте?',
        id: 1,
        aswerState: null,
        answers:[
          {text: '30', id:1},
          {text: '40', id:2},
          {text: '50', id:3},
          {text: '60', id:4}
          ],
        rightAnswerId: 4,
      },
      { question:'Сколько метров в километре?',
        id: 2,
        answers:[
          {text: '100', id:1},
          {text: '1000', id:2},
          {text: '50', id:3},
          {text: '10', id:4}
        ],
        rightAnswerId: 2,
      }
    ]
};
  isQuizFinished = () =>{
    return this.state.activeQuestion + 1 === this.state.quiz.length
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if(this.state.answerState[key]==='success'){
        return
      }
    }
    if (answerId === this.state.quiz[this.state.activeQuestion].rightAnswerId) {
      console.log('correct');
      this.setState({
        answerState: {[answerId]:'success'}
      });
      const timeout = window.setTimeout(() => {
        if(this.isQuizFinished()){
          this.setState({
            isFinished: true
          })
        }else{
          this.setState ({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout);
        }, 1000
      )
    } else{
    console.log('nooo');
      this.setState({
        answerState: {[answerId]:'error'}
      });
    }
};

  render (){
    return (
      <div className={classes.Quiz}>
        <div className={classes["Quiz-wrapper"]}>
          <h1>
            Ответьте на все вопросы
          </h1>
          {
            this.state.isFinished
              ? <FinishQuiz/>
              : <ActiveQuiz question={this.state.quiz[this.state.activeQuestion].question}
                            answers = {this.state.quiz[this.state.activeQuestion].answers}
                            onAnswerClick = {this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            activeQuestion = {this.state.activeQuestion + 1}
                            state={this.state.answerState}
              />

          }

        </div>
      </div>
    )
  }

}
export default Quiz;