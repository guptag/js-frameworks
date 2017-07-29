import  { ReduxAction } from '../actions/actions';
import { combineReducers } from 'redux'
import { domainReducer, IDomainState } from './domain/domainReducer';
import { uiReducer, IUIState } from './ui/uiReducer';

export interface IAppState {
  domain: IDomainState,
  ui: IUIState
};


type IAppRootReducer = (state: IAppState, action: ReduxAction) => IAppState;
export const appRootReducer: IAppRootReducer = (state: IAppState, action: ReduxAction) => {
  return {
    domain: domainReducer(state.domain, action),
    ui: uiReducer(state.ui, action)
  }
}

export default appRootReducer;