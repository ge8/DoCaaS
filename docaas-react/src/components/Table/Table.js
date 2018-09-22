import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './Table.css';


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {        };  
        this.handleCreate = this.handleClick.bind(this);
        this.handleGet = this.handleClick.bind(this);
        this.handleDeal = this.handleClick.bind(this);
        this.handleShuffle = this.handleClick.bind(this);
    }

    handleCreate() {

    }

    handleGet() {

    }

    handleDeal() {

    }

    handleShuffle() {

    }

    render() {
    return (
        <div className="App-header">
            <Button onClick={this.handleCreate} className="create" color='Default' size="lg">
                Create
            </Button>
            <Button onClick={this.handleGet} className="create" color='Default' size="lg">
                Get
            </Button>
            <Button onClick={this.handleDeal} className="create" color='Default' size="lg">
                Deal
            </Button>
            <Button onClick={this.handleShuffle} className="create" color='Default' size="lg">
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
  
  export default Table;