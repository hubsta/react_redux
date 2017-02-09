import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App.js'
import './index.css';
import './bootstrap.css';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
); 
 