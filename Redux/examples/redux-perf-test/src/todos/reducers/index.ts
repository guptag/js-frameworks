import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { Todo, ITodoList } from '../models/todo';
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED
} from '../constants/actionTypes';

const initialState: ITodoList = [<Todo>{
  text: 'Use Redux with TypeScript',
  completed: false,
  id: 0
}];

export default handleActions<ITodoList, Todo>({
  [ADD_TODO]: (state: ITodoList, action: Action<Todo>): ITodoList => {
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: action.payload.completed,
      text: action.payload.text
    }, ...state];
  },

  [DELETE_TODO]: (state: ITodoList, action: Action<Todo>): ITodoList => {
    return state.filter(todo =>
      todo.id !== action.payload.id
    );
  },

  [EDIT_TODO]: (state: ITodoList, action: Action<Todo>): ITodoList => {
    return <ITodoList>state.map(todo =>
      todo.id === action.payload.id
        ? assign(<Todo>{}, todo, { text: action.payload.text })
        : todo
    );
  },

  [COMPLETE_TODO]: (state: ITodoList, action: Action<Todo>): ITodoList => {
    return <ITodoList>state.map(todo =>
      todo.id === action.payload.id ?
        assign({}, todo, { completed: !todo.completed }) :
        todo
    );
  },

  [COMPLETE_ALL]: (state: ITodoList, action: Action<Todo>): ITodoList => {
    const areAllMarked = state.every(todo => todo.completed);
    return <ITodoList>state.map(todo => assign({}, todo, {
      completed: !areAllMarked
    }));
  },

  [CLEAR_COMPLETED]: (state: ITodoList, action: Action<Todo>): ITodoList => {
    return state.filter(todo => todo.completed === false);
  }
}, initialState);