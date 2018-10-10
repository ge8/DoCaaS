import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './Header.css';

import logo from '../../images/logo.png';

const NOT_LOGGED = 0
const LOGGING = 1
const LOGGED = 2

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'strLogin': 'Login',
      'colorLogin': 'danger'
    };  
    this.handleClick = this.handleClick.bind(this); 
  }

  handleClick(e) {
    this.props.handleLogging();
  }

  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Deck Of Cards As A Service</h1>
        <Button onClick={this.handleClick} className="login" color={this.props.loginButtonColor} size="lg">
          {this.props.loginButtonCaption}
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

export default Header;
