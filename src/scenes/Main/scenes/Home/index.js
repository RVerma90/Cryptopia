import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import axios from 'axios';

import logo from './images/logo.svg';
import style from './style.css';

import {Line} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};


class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coins: []
    };
  }

  componentDidMount() {
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10')
      .then(res => {
        const coins = res.data;
        this.setState({coins: coins});
        return coins;
      })
      .then(res => {
        console.log('result',res);
      })
  }

  test() {
    console.log(this.state.coins);
  }

  
  render() {
    return (
      <section className={style.hero}>
        <div>
            <div className={style.title}>
              <span className="title">Top Cryptos of Today</span>
            </div>

            <div className={style.cryptoCards}>
            {Object.keys(this.state.coins).map((key) => (
              <div className={style.coinCard}>
                <span className={style.coinSymbol}>{this.state.coins[key].symbol}</span>
                <span className={style.coinPrice}>${this.state.coins[key].price_usd}</span>
      
                <div className={style.diffStats}>
                  <span className={style.diff1H}>
                    <span className={style.timeDiff}>Last hour</span>
                    <span className={style.amountDiff}>{this.state.coins[key].percent_change_1h}%</span>
                  </span>
                  <span  className={style.diff24H}>
                    <span className={style.timeDiff}>Last 24 hours</span>
                    <span className={style.amountDiff}>{this.state.coins[key].percent_change_24h}%</span>
                  </span>
                  <span  className={style.diff7D}>
                    <span className={style.timeDiff}>Last 7 days</span>
                    <span className={style.amountDiff}>{this.state.coins[key].percent_change_7d}%</span>
                  </span>       
                </div>      

                <div className={style.coinGraph}>
                  <Line data={data} 
                  	width={500}
                    height={300}
                    options={{
                      maintainAspectRatio: true
                    }}
                  />
                </div>                  

                

              </div>
            ))}
            </div>


          <button onClick={this.test.bind(this)}>Test</button>
          <Link to="/about">
            <button>About Page</button>
          </Link>
        </div>
      </section>
    );
  }
}

Home.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Home;
