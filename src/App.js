import React, { Component } from 'react';
import Layout from './hoc/layout/layout.js';
import Quiz from './containers/Qiuz/Quiz.js';

class App extends Component {
  render() {
    return (
      <Layout>
        <Quiz/>
      </Layout>
    );
  }
}

export default App;
