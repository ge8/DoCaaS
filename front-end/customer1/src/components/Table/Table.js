import React from 'react';
import './Table.css';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { 
        images[item.replace('./', '')] = r(item); 
        return 0;
    });
    return images;
}
const images = importAll(require.context('../../images', false));

let winnerMessage = null;
let scoresMessage = null;

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {        };  
    }


    render() {
        // console.log(this.props.deck.cards);
        // this.props.deck.cards.map((object) => console.log(object));

        if (this.props.winner === 0) {
            winnerMessage = <h6 className="position0">Winner</h6>
        } else if (this.props.winner === 1) {
            winnerMessage = <h6 className="position1">Winner</h6>
        } else {
            winnerMessage = null;
        }

        if (this.props.winner >= 0) {
            scoresMessage = <h6 className="scores">Scores = {this.props.scores[0]} vs {this.props.scores[1]}</h6>
        } else {
            scoresMessage = null
        }

        return (
            <div className="App-table">
                <h1 className="table-title">{this.props.message}</h1>
                {scoresMessage}
                {winnerMessage}
                {this.props.deck.cards.map((object, i) => <img src={images[object]} className="App-card" alt="card" />)}
            </div>
        );
    }
}

  
  export default Table;