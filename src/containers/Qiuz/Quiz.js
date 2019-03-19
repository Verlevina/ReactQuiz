import React, {Component} from 'react';
import classes from './Quiz.css';
import FinishQuiz from '../../components/FinishedQuiz/FinishedQuiz.js'
import axios from '../../axios/axios-quiz';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.js'
import Loader from '../../components/UI/loader/loader'

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    isFinished: false,
    answerState: null,
    results: {},
    quiz: [],
    loading: true
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
    const results = this.state.results;
    if (answerId === this.state.quiz[this.state.activeQuestion].rightAnswerId) {
      if(!results[this.state.activeQuestion]){
        results[this.state.activeQuestion] = 'success';
        this.setState({
          results
        });
      }
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
      results[this.state.activeQuestion] = 'error';
      this.setState({
        answerState: {[answerId]:'error'},
        results
      });
    }
};
  onReTryHandler = () => {
    this.setState ({
      activeQuestion: 0,
      isFinished: false,
      answerState: null,
      results: {}
    })
  };

  async componentDidMount () {
    try{
      const response = await axios.get(`quizes/${this.props.match.params.id}.json`);
      console.log(response);
      const quiz = response.data;
      this.setState({
        quiz,
        loading: false
      })
  }  catch(e){
      console.log(e)
    }
  }
  render (){
    return (
      <div className = {classes.Quiz}>
        <div className = {classes["Quiz-wrapper"]}>
          <h1>
            Ответьте на все вопросы
          </h1>
          { this.state.loading
            ? <Loader/>
            :this.state.isFinished
              ? <FinishQuiz results = {this.state.results}
                            quiz = {this.state.quiz}
                            onReTry ={this.onReTryHandler}
              />
              : <ActiveQuiz question = {this.state.quiz[this.state.activeQuestion].question}
                            answers = {this.state.quiz[this.state.activeQuestion].answers}
                            onAnswerClick = {this.onAnswerClickHandler}
                            quizLength = {this.state.quiz.length}
                            activeQuestion = {this.state.activeQuestion + 1}
                            state = {this.state.answerState}
              />
          }
        </div>
      </div>
    )
  }
}
export default Quiz;