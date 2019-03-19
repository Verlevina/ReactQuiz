import React, {Component} from 'react';
import classes from './QuizCreator.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import {createControl, validate, validateForm} from '../../Form/FormControl';
import Select from '../../components/UI/Select/Select';
import axios from '../../axios/axios-quiz';

function createOptionControl (number) {
  return (createControl({
    label: `Вариант ${number}`,
    errorMessage:'Значение не может быть пустым',
    id: number
  },
    {required:true}))
}
function createFormControls () {
  return {
    question: createControl({
        label:'Введите вопрос',
        errorMessage:'Вопрос не может быть пустым'
      },
      {required:true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),

  }
}

export default class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: createFormControls (),
    rightAnswerId: 1,
    isFormValid: false
  };

  onChangeHandler =  (value, name) =>{
    const formControls = { ...this.state.formControls };
    const control = formControls[name];
    control.touched = true;
    control.value = value;
    control.valid = validate(value, control.validation);
    formControls[name] = control;
    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });

  };


  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return(
        <React.Fragment key={`fragment-${index}`}>
        <Input
          valid = {control.valid}
          touched = {control.touched}
          shouldValidate = {!!control.validation}
          key={index}
          label = {control.label}
          value={control.value}
          errorMessage = {control.errorMessage}
          onChange = {event => this.onChangeHandler(event.target.value, controlName)}
        />
        {index === 0 ? <hr/> : null}
        </React.Fragment>
      )
    })
  };

  submitHandler = event =>{
    event.preventDefault();


  };
  addQuestionHandler = event =>{
    event.preventDefault();
    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;
    const questionItem = {
      question: this.state.formControls.question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {
          text: this.state.formControls.option1.value,
          id: this.state.formControls.option1.id
        },
        {
          text: this.state.formControls.option2.value,
          id: this.state.formControls.option2.id
        },
        {
          text: this.state.formControls.option3.value,
          id: this.state.formControls.option3.id
        },
        {
          text: this.state.formControls.option4.value,
          id: this.state.formControls.option4.id
        }
      ]
    };
    quiz.push(questionItem);
    this.setState({
      quiz,
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls ()
    })
  };
  createQuizHandler = async(event) => {
    event.preventDefault();

    try {
      await axios.post('quizes.json', this.state.quiz);

      this.setState({
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls ()
      })
    } catch (e) {
      console.log(e);
    }
  };
  selectChangeHandler = event => {
    this.setState ({
      rightAnswerId: +event.target.value - 1
    })
  };
  render () {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            { this.renderInputs() }
            <Select
              label = 'Выберите правильный ответ'
              onChange = {this.selectChangeHandler}
              options = {[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
                ]
              }
            />
            <Button
            type='primary'
            onClick={this.addQuestionHandler}
            disabled = {!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type='success'
              onClick = {this.createQuizHandler}
              disabled = {this.state.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
        
      </div>
    )
  }
}