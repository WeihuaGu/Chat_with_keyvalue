import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store';
import App from './App';
import Router from './Router';

ReactDOM.render(
<Provider store={store}>
  <React.StrictMode>
    <Router />
  </React.StrictMode>
</Provider>,
  document.getElementById('root')
);

