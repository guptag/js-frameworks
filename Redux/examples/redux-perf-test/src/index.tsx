import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './todos-app/components/app';
import rootReducer from './todos-app/reducers';

import appRootReducer from './redux-core/reducers/appRootReducer';

const initialState = {};

const store: Store<any> = createStore(rootReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);