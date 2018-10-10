import React from 'react';
import { Button } from 'reactstrap';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap"; 
import PropTypes from 'prop-types';
import './Controls.css';


class Controls extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "deckId": ""  };  
        this.handleCreate = this.handleCreate.bind(this);
        this.handleGet = this.handleGet.bind(this);
        this.handleDeal = this.handleDeal.bind(this);
        this.handleShuffle = this.handleShuffle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleCreate() {
        this.props.handleCreate(this.state.deckId);
    }

    handleGet() {
        this.props.handleGet(this.state.deckId);
    }

    handleDeal() {
        this.props.handleDeal(this.state.deckId);
    }

    handleShuffle() {
        this.props.handleShuffle(this.state.deckId);
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    render() {
    return (
        <div className="App-controls">
            <FormGroup controlId="deckId" bsSize="large">
                <ControlLabel>Enter Deck</ControlLabel>
                <FormControl
                autoFocus
                type="text"
                value={this.state.deckId}
                onChange={this.handleChange}
                />
            </FormGroup>
            <Button onClick={this.handleCreate} className="buttons" color='success' size="lg">
                Create
            </Button>
            <Button onClick={this.handleGet} className="buttons" color='info' size="lg">
                Get
            </Button>
            <Button onClick={this.handleDeal} className="buttons" color='warning' size="lg">
                Deal
            </Button>
            <Button onClick={this.handleShuffle} className="buttons" color='danger' size="lg">
                Shuffle
            </Button>
        </div>
    );
    }
}

Button.propTypes = {
    active: PropTypes.bool,
    block: PropTypes.bool,
    color: PropTypes.string, // default: 'secondary'
    disabled: PropTypes.bool,
  
    // Pass in a Component to override default button element
    // example: react-router Link
    // default: 'button'
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  
    // ref will only get you a reference to the Button component, use innerRef to get a reference to the DOM element (for things like focus management).
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  
    onClick: PropTypes.func,
    size: PropTypes.string
  }
  
  export default Controls;