import React from 'react';
import Login from '../Login/Login'
import Controls from '../Controls/Controls'
import Table from '../Table/Table'

const NOT_LOGED = 0
const LOGING = 1
const LOGED = 2

const mainUrl = "http://estaba.net"

let logingPage = null;
let controls = null;
let table = null;

let fixedDeck = { id:"", cards:[] };
let prefixes = [ "C", "S", "D", "H" ];  // Spades, Clubs, Diamons, Hearts
let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" ];

let counter = 0;

prefixes.forEach(prefix => {
  cards.forEach( card => {
    fixedDeck.cards.push('Blank.png');
  })
});

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'username': "",
      'password': "",
      'message': "",
      'deck': fixedDeck
    };  
    this.handleLoged = this.handleLoged.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleGet = this.handleGet.bind(this);
    this.handleDeal = this.handleDeal.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.callAPI = this.callAPI.bind(this);
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
    const response = this.callAPI(mainUrl + '/create');
    counter++;

    fixedDeck.cards = [];
    prefixes.forEach(prefix => {
      cards.forEach( card => {
        fixedDeck.cards.push('Blank.png');
      })
    });

    this.setState({
      'message': "Deck " + counter + " created!",
      'deck': fixedDeck
    });
  }
  
  handleGet() {
    console.log('API for Get');
    console.log(fixedDeck.cards);
    const response = this.callAPI(mainUrl + '/get');
    
    fixedDeck.cards = [];
    prefixes.forEach(prefix => {
      cards.forEach( card => {
        fixedDeck.cards.push(card+prefix+'.png');
      })
    });

    this.setState({
      'message': "",
      'deck': fixedDeck
    });
  }

  handleDeal() {
    console.log('API for Deal');
    const response = this.callAPI(mainUrl + '/deal');
    let dealDeck = this.state.deck;
    let newStack = [];
    this.state.deck.cards.map((object,i) => {
      if (i!==4 && i!==6 && i!==20 && i!==22) {
        newStack.push("Blank.png");
      } else {
        newStack.push(object);
      }
    });
    dealDeck.cards = newStack;
    this.setState({
      'message': "",
      'deck': dealDeck
    });
  }

  handleShuffle() {
    console.log('API for Shuffle');
    const response = this.callAPI(mainUrl + '/shuffle');
    
    fixedDeck.cards = [];
    prefixes.forEach(prefix => {
      cards.forEach( card => {
        fixedDeck.cards.push(card+prefix+'.png');
      })
    });

    this.setState({
      'message': "",
      'deck': fixedDeck
    });
  }

  callAPI(url) {    
    return fetch(url, {
      method: 'GET',
      headers: { Authorization: 'Basic ' + btoa(this.state.username + ":" + this.state.password) }
    }).then(response => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    );
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
      table = <Table deck={this.state.deck} message={this.state.message} />;
    }

    return (
      <div className="App-header">
        {logingPage}
        {controls}
        {table}
      </div>
    );
  }
}

export default MainBody;