import React, { Component } from 'react';
import Header from './components/Header/Header';
import MainBody from './components/MainBody/MainBody';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {    };   
  }

  render() {
    return (
      <div className="App">
        <Header />
        <MainBody />
      </div>
    );
  }
}

export default App;
