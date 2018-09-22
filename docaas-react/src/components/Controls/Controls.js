import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './Controls.css';


class Controls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {        };  
        this.handleCreate = this.handleCreate.bind(this);
        this.handleGet = this.handleGet.bind(this);
        this.handleDeal = this.handleDeal.bind(this);
        this.handleShuffle = this.handleShuffle.bind(this);
    }

    handleCreate() {
        this.props.handleCreate();
    }

    handleGet() {
        this.props.handleGet();
    }

    handleDeal() {
        this.props.handleDeal();
    }

    handleShuffle() {
        this.props.handleShuffle();
    }

    render() {
    return (
        <div className="App-header">
            <Button onClick={this.handleCreate} className="create" color='success' size="lg">
                Create
            </Button>
            <Button onClick={this.handleGet} className="create" color='info' size="lg">
                Get
            </Button>
            <Button onClick={this.handleDeal} className="create" color='warning' size="lg">
                Deal
            </Button>
            <Button onClick={this.handleShuffle} className="create" color='danger' size="lg">
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