import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import Main from './scenes/Main';

ReactDOM.render(
  <BrowserRouter>
		<Route path="/" component={Main} />
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
