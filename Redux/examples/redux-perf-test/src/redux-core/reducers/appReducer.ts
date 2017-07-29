import  { ReduxAction } from '../actions/actions';
import { combineReducers } from 'redux'
import { domainReducer, IDomainState, DefaultDomainState } from './domain/domainReducer';
import { uiReducer, IUIState, DefaultUIState } from './ui/uiReducer';

export interface IAppState {
  domain: IDomainState,
  ui: IUIState
};

export const DefaultAppState = {
  domain: DefaultDomainState,
  ui: DefaultUIState
};


type IAppReducer = (state: IAppState, action: ReduxAction) => IAppState;
export const appReducer: IAppReducer = (state: IAppState = DefaultAppState, action: ReduxAction) => {
  return {
    domain: domainReducer(state.domain, action),
    ui: uiReducer(state.ui, action)
  }
}

export default appReducer;