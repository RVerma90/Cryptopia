/**
 * This is the Header layout component
 */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import style from './style.css';

/**
 * @todo Add toggleMenu(false) to all outgoing links
 */
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: props.menuOpen
    };
  }

  render() {
    return (
      <header
        className={style.header}
      >
        <NavLink to="/" className={style.logo} />
      </header>
    );
  }
}

export default Header;
