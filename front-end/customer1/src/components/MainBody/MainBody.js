import React from 'react';
import Login from '../Login/Login'
import Controls from '../Controls/Controls'
import Table from '../Table/Table'

const USE_FIXED_VALUES = 1

const NOT_LOGGED = 0
const LOGGING = 1
const LOGGED = 2

const mainUrl = "https://##CNAMEGOESHERE##"

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
    this.handleLogged = this.handleLogged.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleGet = this.handleGet.bind(this);
    this.handleDeal = this.handleDeal.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.blankCards = this.blankCards.bind(this);
  }  

  blankCards() {    
    fixedDeck.cards = [];
    prefixes.forEach(prefix => {
      cards.forEach( card => {
        fixedDeck.cards.push('Blank.png');
      })
    });
  }

  handleLogged(username, password) {
    this.setState({
      'username': username,
      'password': password
    });
    this.props.handleLogged(username, password);
  }

  handleCreate(deckId) {
    console.log('API for Create');
    let message = "";
    this.blankCards();

    this.callAPI(mainUrl + '/create', deckId).then(response => {
      fixedDeck.id = deckId;
  
      if (!USE_FIXED_VALUES) {
        if (response.deckId === "0") {
          message = "Deck could not be created";
        } else {
          message = "Deck " + response.deckId + " created!";
        }
  
        this.setState({
          'message': message,
          'deck': fixedDeck
        });
      }
    });

    if (USE_FIXED_VALUES) {
      counter++;
      message = "Deck " + counter + " created!"

      this.setState({
        'message': message,
        'deck': fixedDeck
      });
    }
  }
  
  handleGet(deckId) {
    console.log('API for Get');
    let message = "";

    this.callAPI(mainUrl + '/get', deckId).then(response => { 
      if(!USE_FIXED_VALUES) {
        if (response.id === "0")  {
          message = "Invalid Deck";   
          this.blankCards();
        } else {
          fixedDeck.id = response.id;
          fixedDeck.cards = [];
          response.cards.map((card,i) => {
            fixedDeck.cards.push(card+".png");
          });
        } 
  
        this.setState({
          'message': message,
          'deck': fixedDeck
        });
      } 
    });    
    
    if (USE_FIXED_VALUES) {
      fixedDeck.id = this.state.deck.id;
      fixedDeck.cards = [];
      prefixes.forEach(prefix => {
        cards.forEach( card => {
          fixedDeck.cards.push(card+prefix+'.png');
        })
      });

      this.setState({
        'message': message,
        'deck': fixedDeck
      });
    }
  }

  handleDeal(deckId) {
    console.log('API for Deal');
    let message = "";
    this.blankCards();

    this.callAPI(mainUrl + '/deal', deckId).then(response => {
      if (!USE_FIXED_VALUES) {
        if (counter === "0") {
          message = "Invalid Deck";
        } else {
          message = "";
          response.cards.map((object,i) => {
            if (i===0) fixedDeck.cards[4] = object+".png";
            if (i===1) fixedDeck.cards[6] = object+".png";
            if (i===2) fixedDeck.cards[20] = object+".png";
            if (i===3) fixedDeck.cards[22] = object+".png";
          }); 
        }
    
        this.setState({
          'message': message,
          'deck': fixedDeck
        });
      }
    });
    
    if (USE_FIXED_VALUES) {
      fixedDeck.cards.map((object,i) => {
        if (i===0) fixedDeck.cards[4] = Math.floor((Math.random()+1)*4) + "C.png";
        if (i===1) fixedDeck.cards[6] = Math.floor((Math.random()+1)*4) + "S.png";
        if (i===2) fixedDeck.cards[20] = Math.floor((Math.random()+1)*4) + "D.png";
        if (i===3) fixedDeck.cards[22] = Math.floor((Math.random()+1)*4) + "H.png";
      }); 

      this.setState({
        'message': message,
        'deck': fixedDeck
      });
    }
  }

  handleShuffle(deckId) {
    console.log('API for Shuffle');
    let message = "";

    this.callAPI(mainUrl + '/shuffle', deckId).then(response => {
      if (!USE_FIXED_VALUES) {
        if (response.id === "0")  {
          message = "Invalid Deck";   
          this.blankCards();
        } else {
          fixedDeck.id = response.id;
          fixedDeck.cards = [];
          response.cards.map((card,i) => {
            fixedDeck.cards.push(card+".png");
          });
        } 
  
        this.setState({
          'message': message,
          'deck': fixedDeck
        });
      }    
    }); 

    if (USE_FIXED_VALUES) {
      fixedDeck.id = this.state.deck.id;
      fixedDeck.cards = [];
      prefixes.forEach(prefix => {
        cards.forEach( card => {
          fixedDeck.cards.push(card+prefix+'.png');
        })
      });

      this.setState({
        'message': message,
        'deck': fixedDeck
      });
    }
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
    logingPage = null;
    controls = null;
    table = null;
    if (logingStatus === LOGGING) {
      logingPage = <Login handleLogged={this.handleLogged} />
    }
    else if (logingStatus === LOGGED) {
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