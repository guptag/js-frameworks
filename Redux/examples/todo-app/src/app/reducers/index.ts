import { combineReducers } from 'redux';

import todos from '../../todos/reducers/index';

const rootReducer = combineReducers({
  todos
});

export default rootReducer;