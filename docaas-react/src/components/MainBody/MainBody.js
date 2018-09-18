import React from 'react';
import Login from '../Login/Login'

const NOT_LOGGED = 0
const LOGGING = 1
const LOGGED = 2

class MainBody extends React.Component {
    constructor(props) {
      super(props);
      this.state = {      };  
    }
    
  render() {
    const loggingStatus = this.props.loggingStatus;
    let response = null;

    if (loggingStatus == LOGGING) {
        response = <Login />
    }
    return (
      <div className="App-header">
        {response}
      </div>
    );
  }
}

export default MainBody;