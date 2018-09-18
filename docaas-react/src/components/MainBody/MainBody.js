import React from 'react';
import Login from '../Login/Login'

class MainBody extends React.Component {
    constructor(props) {
      super(props);
      this.state = {      };  
    }
    
  render() {
    return (
      <div className="App-header">
        <Login />
      </div>
    );
  }
}

export default MainBody;