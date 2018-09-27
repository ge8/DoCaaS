import React from 'react';
import Login from '../Login/Login'
import Controls from '../Controls/Controls'
import Table from '../Table/Table'

const NOT_LOGED = 0
const LOGING = 1
const LOGED = 2

const mainUrl = "https://estaba.net"

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
    this.blankCards = this.blankCards.bind(this);
  }  

  blankCards() {    
    prefixes.forEach(prefix => {
      cards.forEach( card => {
        fixedDeck.cards.push('Blank.png');
      })
    });
  }

  handleLoged(username, password) {
    this.setState({
      'username': username,
      'password': password
    });
    this.props.handleLoged(username, password);
  }

  handleCreate(deckId) {
    console.log('API for Create');
    this.callAPI(mainUrl + '/create', deckId).then(response => {
      fixedDeck.id = deckId;
      fixedDeck.cards = [];
      this.blankCards();
      //Comment to disable hard coded response
      counter++;
      let message = "";
      if (counter < 0) {
        message = "Invalid Deck";
      } else {
        message = "Deck " + counter + " created!"
      }
      //End comment
  
      console.log(response);
      //message = "Deck " + response.deckId + " created!";
      this.setState({
        'message': message,
        'deck': fixedDeck
      });
    });

  }
  
  handleGet(deckId) {
    console.log('API for Get');
    console.log(fixedDeck.cards);
    this.callAPI(mainUrl + '/get', deckId).then(response => {
      fixedDeck.id = this.state.deck.id;
      fixedDeck.cards = [];
      prefixes.forEach(prefix => {
        cards.forEach( card => {
          fixedDeck.cards.push(card+prefix+'.png');
        })
      });
  
      let message = "";
      if (counter < 0) {
        message = "Invalid Deck";
      } else {
        message = "";
      }
  
      this.setState({
        'message': message,
        'deck': fixedDeck
      });
    });    
  }

  handleDeal(deckId) {
    console.log('API for Deal');
    const response = this.callAPI(mainUrl + '/deal', deckId);
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
    dealDeck.id = this.state.deck.id;  

    let message = "";
    if (counter < 0) {
      message = "Invalid Deck";
    } else {
      message = "";
    }

    this.setState({
      'message': message,
      'deck': fixedDeck
    });
  }

  handleShuffle(deckId) {
    console.log('API for Shuffle');
    const response = this.callAPI(mainUrl + '/shuffle', deckId);
    
    fixedDeck.id = this.state.deck.id;  
    fixedDeck.cards = [];
    prefixes.forEach(prefix => {
      cards.forEach( card => {
        fixedDeck.cards.push(card+prefix+'.png');
      })
    });

    let message = "";
    if (counter < 0) {
      message = "Invalid Deck";
    } else {
      message = "";
    }

    this.setState({
      'message': message,
      'deck': fixedDeck
    });
  }

  callAPI(url, deckId) {    
    return fetch(url, {
      method: 'GET',
      headers: { 
        Authorization: 'Basic ' + btoa(this.state.username + ":" + this.state.password),
        'deckId': deckId 
      }
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