import { combineReducers } from 'redux';
import {AppAction} from '../../actions/actions';
import {controlPanelReducer, IConrolPanelOptions, DefaultControlPanelOptions} from './controlPanel/controlPanelReducer';

export interface IUIState {
  controlPanel: IConrolPanelOptions
}

export const DefaultUIState = {
  controlPanel: DefaultControlPanelOptions
}

type IUIReducer = (state: IUIState, action: AppAction) => IUIState;
export const uiReducer: IUIReducer = (state: IUIState = DefaultUIState, action: AppAction) => {
  return {
    controlPanel: controlPanelReducer(state.controlPanel, action)
  }
}


