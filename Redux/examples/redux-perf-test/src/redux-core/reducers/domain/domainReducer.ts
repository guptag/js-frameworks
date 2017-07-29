import { combineReducers } from 'redux';
import {ReduxAction} from '../../actions/actions';
import {tickersReducer, ITickersState} from './tickers/tickersReducer';

export interface IDomainState {
  tickers: ITickersState
}

type IDomainReducer = (state: IDomainState, action: ReduxAction) => IDomainState;

export const domainReducer: IDomainReducer = (state: IDomainState, action: ReduxAction) => {
  return {
    tickers: tickersReducer(state.tickers, action)
  }
}


