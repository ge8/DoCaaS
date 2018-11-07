import React from 'react';
import Login from '../Login/Login'
import Controls from '../Controls/Controls'
import Table from '../Table/Table'

const USE_FIXED_VALUES = 0

// const NOT_LOGGED = 0
const LOGGING = 1
const LOGGED = 2

const mainUrl = "https://CUSTOMERGOESHERE.DOMAINGOESHERE.com"
// const mainUrl = "https://customer1.estaba.net" //HARDCODED
// const mainUrl = "http://localhost:3001" //HARDCODED
// const mainUrl = "https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/"

let logingPage = null;
let controls = null;
let table = null;

let fixedDeck = { id:"", cards:[] };
let prefixes = [ "C", "S", "D", "H" ];  // Spades, Clubs, Diamons, Hearts
let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" ];

let counter = 0;
// let deckId = "1"; //HARDCODED
prefixes.forEach(prefix => {
  cards.forEach( card => {
    fixedDeck.cards.push('Blank.png');
  })
});

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      'username': "",
      'password': "",
      'message': "",
      'deck': fixedDeck,
      'winner': -1,
      'scores': []
    };  
    this.handleLogged = this.handleLogged.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleGet = this.handleGet.bind(this);
    this.handleGame = this.handleGame.bind(this);
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
        if (response.name === "NOT_AUTHORIZED")  {
          message = "Not Authorized - check your username + password!";
        } else if (response.name === "0") {
          message = "Deck could not be created";
        } else {
          message = "Deck " + response.name + " created!";
        }
  
        this.setState({
          'message': message,
          'deck': fixedDeck,
          'winner': -1
        });
      }
    });

    if (USE_FIXED_VALUES) {
      counter++;
      message = "Deck " + counter + " created!"

      this.setState({
        'message': message,
        'deck': fixedDeck,
        'winner': -1
      });
    }
  }
  
  handleGet(deckId) {
    console.log('API for Get');
    let message = "";

    this.callAPI(mainUrl + '/get', deckId).then(response => { 
      if(!USE_FIXED_VALUES) {
        if (response.name === "NOT_AUTHORIZED")  {
          message = "Not Authorized - check your username + password!";
          this.blankCards();
        } else if (response.name === "0")  {
          message = "Invalid Deck";   
          this.blankCards();
        } else {
          fixedDeck.id = response.name;
          fixedDeck.cards = [];
          response.cards.map((card,i) => {
            fixedDeck.cards.push(card+".png");
            return 0;
          });
        } 
  
        this.setState({
          'message': message,
          'deck': fixedDeck,
          'winner': -1
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
        'deck': fixedDeck,
        'winner': -1
      });
    }
  }

  handleGame(deckId) {
    console.log('API for Game');
    let message = "";
    this.blankCards();

    this.callAPI(mainUrl + '/game', deckId).then(response => {
      // {"cards":["6S","7C"],"scores":[6,3],"winner":1}
      if (!USE_FIXED_VALUES) {
        if (response.name === "NOT_AUTHORIZED")  {
          message = "Not Authorized - check your username + password!";
        } else if (counter === "0") {
          message = "Invalid Deck";
        } else {
          message = "";
          fixedDeck.cards[6] = response.cards[0] + ".png";
          fixedDeck.cards[20] = response.cards[1] + ".png";
        }
    
        this.setState({
          'message': message,
          'deck': fixedDeck,
          'winner': response.winner,
          'scores': response.scores
        });
      }
    });
    
    if (USE_FIXED_VALUES) {
      let card1, card2, tempWinner;
      card1 = Math.floor((Math.random()+1)*4);
      card2 = Math.floor((Math.random()+1)*4);
      tempWinner = 0;
      if (card2>card1) tempWinner = 1;

      fixedDeck.cards.map((object,i) => {
        if (i===0) fixedDeck.cards[6] = card1 + "S.png";
        if (i===1) fixedDeck.cards[20] = card2 + "D.png";
        return 0;
      }); 

      this.setState({
        'message': message,
        'deck': fixedDeck,
        'winner': tempWinner,
        'scores': [25,18]
      });
    }
  }

  handleShuffle(deckId) {
    console.log('API for Shuffle');
    let message = "";

    this.callAPI(mainUrl + '/shuffle', deckId).then(response => {
      if (!USE_FIXED_VALUES) {
        if (response.name === "NOT_AUTHORIZED")  {
          message = "Not Authorized - check your username + password!";
          this.blankCards();
        } else if (response.name === "0")  {
          message = "Invalid Deck";   
          this.blankCards();
        } else {
          fixedDeck.id = response.name;
          fixedDeck.cards = [];
          response.cards.map((card,i) => {
            fixedDeck.cards.push(card+".png");
            return 0;
          });
        } 
  
        this.setState({
          'message': message,
          'deck': fixedDeck,
          'winner': -1
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
        'deck': fixedDeck,
        'winner': -1
      });
    }
  }

  callAPI(url, deckId) {
    return this.props.getAuthToken().then((authToken) => {
      return fetch(url + "?deck=" + deckId, {
        method: 'GET',
        headers: { 
          Authorization: authToken
        }
      })
    }).then(response => {
        console.log(response);
        if (response.status === 401) {
          // Not Authorized!
          return { name:"NOT_AUTHORIZED" };
        } else if (response.ok) {
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
      controls = <Controls 
                    handleCreate={this.handleCreate} 
                    handleGet={this.handleGet} 
                    handleGame={this.handleGame} 
                    handleShuffle={this.handleShuffle} 
                  />;
      table = <Table 
                deck={this.state.deck} 
                message={this.state.message} 
                winner={this.state.winner}
                scores={this.state.scores}
              />;
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