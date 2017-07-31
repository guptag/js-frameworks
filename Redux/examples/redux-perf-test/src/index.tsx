import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore } from 'redux';
import { Provider } from 'react-redux';

import appStore from './redux-core/store/appStore';
import actionSimulator from './services/actionSimulator';

//import App from './todos-app/components/app';
//import rootReducer from './todos-app/reducers';

//const initialState = {};

//const store: Store<any> = createStore(rootReducer, initialState);

import App from './ui/components/app';

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('app')
); 

window["actionSimulator"] = actionSimulator;