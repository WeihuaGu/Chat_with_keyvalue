import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Router from './Router';

ReactDOM.render(
<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <React.StrictMode>
    <Router />
  </React.StrictMode>
  </PersistGate>
</Provider>,
  document.getElementById('root')
);

