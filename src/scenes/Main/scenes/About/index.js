import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './style.css';

class About extends Component {
  render() {
    return (
      <section className={style.about}>
        <div className={style.app}>
          <Link to="/">
            <button>Home Page</button>
          </Link>
        </div>
      </section>
    );
  }
}

About.contextTypes = {
  router: PropTypes.object.isRequired
};

export default About;
