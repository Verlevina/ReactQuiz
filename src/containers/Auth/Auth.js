import React, {Component} from 'react';
import classes from './Auth.css';
import  Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is  from 'is_js';
import axios from 'axios';


class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage:'Введите корректный Email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
          value: '',
          type: 'password',
          label: 'Пароль',
          errorMessage:'Введите корректный пароль',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6
          }
      }
    }
  };

  loginHandler= async() =>{
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };
    try {
      const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAaQLoJ_WwSGC3ilZ_Mt3EVz5NGIMGeR0M', authData)
    } catch(e) {
      console.log(e)
    }
  };

  registerHandler= async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };
    try {
      const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAaQLoJ_WwSGC3ilZ_Mt3EVz5NGIMGeR0M', authData)
    } catch(e) {
      console.log(e)
    }
    };
  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl = (value, validation) => {
    if(!validation){
      return true
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = (value.length >= validation.minLength && isValid);
    }

    return isValid;
};

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;
    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid
    });
    console.log(event.target.value, controlName);
  };

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
     const control = this.state.formControls[controlName];
      return (
        <Input
          key={index}
          label = {control.label}
          value = {control.value}
          type = {control.type}
          valid = {control.valid}
          touched = {control.touched}
          errorMessage = {control.errorMessage}
          shouldValidate = {!!control.validation}
          onChange = {event => this.onChangeHandler(event, controlName)}
        />
      )
    });

  };

  render () {
    return (
      <div className={classes.Auth}>
<div>
  <h1>Авторизация</h1>
  <form onSubmit={this.submitHandler} className={classes.AuthForm}>
    {this.renderInputs()}
<Button
  type='success'
  onClick={this.loginHandler}
  disabled = {!this.state.isFormValid}
  >
  Войти
</Button>
    <Button
      type='primary'
      onClick={this.registerHandler}
      disabled = {!this.state.isFormValid}
    >
      Зарегистрироваться
    </Button>
  </form>
</div>
      </div>
    )
  }
}

export default Auth;