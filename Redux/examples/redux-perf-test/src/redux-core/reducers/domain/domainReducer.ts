import { combineReducers } from 'redux';
import {AppAction} from '../../actions/actions';
import {tickersReducer, ITickerState, DefaultTickersState} from './tickers/tickersReducer';

export interface IDomainState {
  tickersState: ITickerState
}

export const DefaultDomainState: IDomainState = {
  tickersState: DefaultTickersState
};

type IDomainReducer = (state: IDomainState, action: AppAction) => IDomainState;
export const domainReducer: IDomainReducer = (state: IDomainState = DefaultDomainState, action: AppAction) => {
  return {
    tickersState: tickersReducer(state.tickersState, action)
  }
}


