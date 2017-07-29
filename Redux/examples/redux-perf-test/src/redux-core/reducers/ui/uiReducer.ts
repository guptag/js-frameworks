import { combineReducers } from 'redux';
import {ReduxAction} from '../../actions/actions';
import {controlPanelReducer, IConrolPanelState, DefaultControlPanelState} from './controlPanel/controlPanelReducer';

export interface IUIState {
  controlPanel: IConrolPanelState
}

export const DefaultUIState = {
  controlPanel: DefaultControlPanelState
}

type IUIReducer = (state: IUIState, action: ReduxAction) => IUIState;
export const uiReducer: IUIReducer = (state: IUIState = DefaultUIState, action: ReduxAction) => {
  return {
    controlPanel: controlPanelReducer(state.controlPanel, action)
  }
}


