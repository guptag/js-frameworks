import { createStore } from 'redux'
import {appReducer, DefaultAppState} from '../reducers/appReducer';

var appStore = createStore(appReducer, DefaultAppState);

export default appStore;