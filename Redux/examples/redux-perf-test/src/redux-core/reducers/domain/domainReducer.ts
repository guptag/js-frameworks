import { combineReducers } from 'redux';
import {ReduxAction} from '../../actions/actions';
import {tickersReducer, ITickersState, DefaultTickersState} from './tickers/tickersReducer';

export interface IDomainState {
  tickers: ITickersState
}

export const DefaultDomainState = {
  tickers: DefaultTickersState
};

type IDomainReducer = (state: IDomainState, action: ReduxAction) => IDomainState;
export const domainReducer: IDomainReducer = (state: IDomainState = DefaultDomainState, action: ReduxAction) => {
  return {
    tickers: tickersReducer(state.tickers, action)
  }
}


