import { combineReducers } from 'redux';
import {ReduxAction} from '../../actions/actions';
import {controlPanelReducer, IConrolPanelState} from './controlPanel/controlPanelReducer';

export interface IUIState {
  controlPanel: IConrolPanelState
}

type IUIReducer = (state: IUIState, action: ReduxAction) => IUIState;
export const uiReducer: IUIReducer = (state: IUIState, action: ReduxAction) => {
  return {
    controlPanel: controlPanelReducer(state.controlPanel, action)
  }
}


