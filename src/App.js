import React, { Component } from 'react';
import Layout from './hoc/layout/layout.js';
import {Route, Switch} from 'react-router-dom';
import Quiz from './containers/Qiuz/Quiz.js';
import AboutUs from './containers/AboutUs/AboutUs';
import Auth from './containers/Auth/Auth';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';


class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/Auth" component={Auth}/>
          <Route path="/quizCreator" component={QuizCreator}/>
          <Route path="/quiz/:id" component={Quiz}/>
          <Route path="/" component={QuizList}/>
          <Route path="/aboutUs" component={AboutUs}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
