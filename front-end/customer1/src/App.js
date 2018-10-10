import React, { Component } from 'react';
import Header from './components/Header/Header';
import MainBody from './components/MainBody/MainBody';

import './App.css';

// import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

// import Amplify, { Auth } from 'aws-amplify';
// import aws_exports from './aws-exports';
// Amplify.configure(aws_exports);

const NOT_LOGGED = 0
const LOGGING = 1
const LOGGED = 2

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'logingStatus': NOT_LOGGED,
      'loginButtonColor':'danger',
      'loginButtonCaption':'Login',
      'username': "",
      'password': ""
    };   
    this.handleLogging = this.handleLogging.bind(this);
    this.handleLogged = this.handleLogged.bind(this);
  }

  // async componentDidMount() {
  //   let session = await Auth.currentSession();
  //   if (session && session.idToken) {
  //     this.setState( {
  //       'logingStatus': LOGGED
  //     }
  //     )
  //   }
  // }

  handleLogging() {
    this.setState ({
      'logingStatus': LOGGING
    })
  }

  handleLogged(username, password) {
    this.setState ({
      'logingStatus': LOGGED,
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
                handleLogging={this.handleLogging} 
                loginButtonColor={this.state.loginButtonColor} 
                loginButtonCaption={this.state.loginButtonCaption} 
        />
        <MainBody logingStatus={this.state.logingStatus} handleLogged={this.handleLogged} />
      </div>
    );
  }
}

// export default withAuthenticator(App);
export default (App);