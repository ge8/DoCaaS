import React, { Component } from 'react';
import HeaderLogin from './components/HeaderLogin/HeaderLogin';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {    };   
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <HeaderLogin />
        </header>
      </div>
    );
  }
}

export default App;
