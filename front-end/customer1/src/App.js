import React, { Component } from 'react';
import Header from './components/Header/Header';
import MainBody from './components/MainBody/MainBody';
import jwtDecode from 'jwt-decode';
import './App.css';


const NOT_LOGGED = 0
const LOGGING = 1
const LOGGED = 2

if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
  window.location = 'https://' + window.location.hostname + window.location.pathname + window.location.search;
}

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

  componentDidMount(){
    this.getCurrentAuthToken();
  }
  
  async getCurrentAuthToken() {
    // If Basic:
    this.setState( { claims: { ["custom:plan"]:"silver" }});
    return 'Basic ' + btoa(this.state.username + ":" + this.state.password);

    // else if cognito: 
    // if (this.state.jwt) {
    //   return this.state.jwt;
    // } else {
    //   let session = await Auth.currentSession();
    //   if (session && session.idToken) {
    //     printIdentityId(session.idToken.jwtToken);
    //     let claims = jwtDecode(session.idToken.jwtToken);
    //     this.setState( {
    //       'claims': claims,
    //       'jwt': session.idToken.jwtToken,
    //       'logingStatus': LOGGED
    //     });
  
    //     return session.idToken.jwtToken;
    //   } else return null;
    // }
  }

  // printIdentityId(idToken) {
  //   const info = await Auth.currentUserInfo();
  //   console.log("Identity ID:", info.id);
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
        <MainBody logingStatus={this.state.logingStatus} claims={this.state.claims} handleLogged={this.handleLogged} getAuthToken={this.getCurrentAuthToken.bind(this)} /> 
      </div>
    );
  }
}

export default (App);