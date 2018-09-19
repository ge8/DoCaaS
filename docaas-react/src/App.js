import React, { Component } from 'react';
import Header from './components/Header/Header';
import MainBody from './components/MainBody/MainBody';

import './App.css';

const NOT_LOGGED = 0
const LOGGING = 1
const LOGGED = 2

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'loggingStatus': NOT_LOGGED
    };   
    this.handleLogging = this.handleLogging.bind(this);
    this.handleLogged = this.handleLogged.bind(this);
  }

  handleLogging() {
    this.setState ({
      'loggingStatus': LOGGING
    })
  }

  handleLogged() {
    this.setState ({
      'loggingStatus': LOGGED
    })
  }

  render() {
    return (
      <div className="App">
        <Header loggingStatus={this.state.loggingStatus} handleLogging={this.handleLogging} />
        <MainBody loggingStatus={this.state.loggingStatus} handleLogged={this.handleLogged} />
      </div>
    );
  }
}

export default App;
