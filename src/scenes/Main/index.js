import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import TWEEN from '@tweenjs/tween.js';
import Raf from './../../lib/Raf';

import Header from './components/Header';

import Home from './scenes/Home';
import About from './scenes/About';

import style from './style.css';

class Main extends Component {

  componentDidMount() {
    // This is a general rAF updater for TWEEN
    this.rafId = Raf.subscribe(time => {
      // Update tween timers
      TWEEN.update(time);
    });
    console.log(process.env.PUBLIC_URL);
  }

  helmetCallback(newState) {
    if(window.analytics) {
      window.analytics.page();
    }
  }

  render() {
    return (
      <div className={style.root}>
        <Helmet>
          <meta name="description" content="" />
          <meta name="og:title" content="Title" />
          <meta name="og:type" content="Type" />
          <meta name="og:url" content="https://example.com" />
          <meta property="og:image"
                content={
                  'https://example.com' + 
                  process.env.PUBLIC_URL +
                  '/favicon.png'
                }
          />
          <meta name="og:description" content="WebsiteName" />
          <meta name="og:site_name" content="WebsiteName" />
          <meta name="twitter:card" content="WebsiteName" />
          <meta name="twitter:site" content="@" />
          <meta name="twitter:title" content="WebsiteName" />
          <meta name="twitter:description" content="" />
          <meta name="twitter:creator" content="" />
          <meta
            name="twitter:image"
            content={
              'https://example.com' +
              process.env.PUBLIC_URL +
              '/favicon.png'
            }
          />          
        </Helmet>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    );
  }
}

export default Main;
