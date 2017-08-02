import { combineReducers } from 'redux';
import {AppAction} from '../../actions/actions';
import {tickersReducer, ITickerHash, DefaultTickersState} from './tickers/tickersReducer';

export interface IDomainState {
  tickersHash: ITickerHash
}

export const DefaultDomainState: IDomainState = {
  tickersHash: DefaultTickersState
};

type IDomainReducer = (state: IDomainState, action: AppAction) => IDomainState;
export const domainReducer: IDomainReducer = (state: IDomainState = DefaultDomainState, action: AppAction) => {
  return {
    tickersHash: tickersReducer(state.tickersHash, action)
  }
}


