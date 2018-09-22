import React, { Component } from 'react';
import Header from './components/Header/Header';
import MainBody from './components/MainBody/MainBody';

import './App.css';

const NOT_LOGED = 0
const LOGING = 1
const LOGED = 2

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'logingStatus': NOT_LOGED,
      'loginButtonColor':'danger',
      'loginButtonCaption':'Login',
      'username': "",
      'password': ""
    };   
    this.handleLoging = this.handleLoging.bind(this);
    this.handleLoged = this.handleLoged.bind(this);
  }

  handleLoging() {
    this.setState ({
      'logingStatus': LOGING
    })
  }

  handleLoged(username, password) {
    this.setState ({
      'logingStatus': LOGED,
      'loginButtonColor': 'primary',
      'loginButtonCaption': 'Hello ' + username,
      'username': username,
      'password': password
    });
  }

  render() {
    return (
      <div className="App">
        <Header logingStatus={this.state.logingStatus} 
                handleLoging={this.handleLoging} 
                loginButtonColor={this.state.loginButtonColor} 
                loginButtonCaption={this.state.loginButtonCaption} 
        />
        <MainBody logingStatus={this.state.logingStatus} handleLoged={this.handleLoged} />
      </div>
    );
  }
}

export default App;
