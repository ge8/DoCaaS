import React from 'react';
import Login from '../Login/Login'
import Controls from '../Controls/Controls'
import Table from '../Table/Table'

const NOT_LOGED = 0
const LOGING = 1
const LOGED = 2

let logingPage = null;
let controls = null;
let table = null;

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'username': "",
      'password': "",
      'cards': []
    };  
    this.handleLoged = this.handleLoged.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleGet = this.handleGet.bind(this);
    this.handleDeal = this.handleDeal.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
  }

  handleLoged(username, password) {
    this.setState({
      'username': username,
      'password': password
    });
    this.props.handleLoged(username, password);
  }

  handleCreate() {
    console.log('API for Create');
    console.log(btoa(this.state.username + ":" + this.state.password));
    // const urlCreate = 'estaba.net/create';
    // return fetch(urlCreate, {
    //       method: 'GET',
    //       headers: { Authorization: 'Basic ' + btoa(this.state.username + ":" + this.state.password) }
    //   }).then(response => {
    //       if (response.ok) {
    //         return response.json();
    //       }
    //       throw new Error('Request failed!');
    //     }, networkError => console.log(networkError.message)
    //   ).then(jsonResponse => {
    //     return jsonResponse.id
    //   }); 

  }
  
  handleGet() {
    console.log('API for Get');
  }

  handleDeal() {
    console.log('API for Deal');
  }

  handleShuffle() {
    console.log('API for Shuffle');
  }
    
  render() {
    const logingStatus = this.props.logingStatus;
    //console.log(logingStatus);
    logingPage = null;
    controls = null;
    table = null;
    if (logingStatus === LOGING) {
      logingPage = <Login handleLoged={this.handleLoged} />
    }
    else if (logingStatus === LOGED) {
      controls = <Controls handleCreate={this.handleCreate} _
                           handleGet={this.handleGet} _
                           handleDeal={this.handleDeal} _
                           handleShuffle={this.handleShuffle} />;
      table = <Table />;
    }

    return (
      <div className="App-header">
        {logingPage}
        {controls}
      </div>
    );
  }
}

export default MainBody;