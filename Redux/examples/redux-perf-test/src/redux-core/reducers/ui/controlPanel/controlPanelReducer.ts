import  {
  AppAction,
  ControlPanelToggleAction,
  ControlPanelChangeIntervalAction,
  CONTROLPANEL_TOGGLE_ACTION,
  CONTROLPANEL_CHANGE_INTERVAL
} from '../../../actions/actions';

import { ControlPanelActionType, ControlPanelDefaults } from '../../../config/config';

export interface IConrolPanelOptions {
  addTickersEnabled: boolean;
  addTickerIntervalMSec: number;
  updateValuesEnabled: boolean;
  updateValuesIntervalMSec: number;
  replaceTickersEnabled: boolean;
  replaceTickerIntervalMSec: number;
  deleteTickersEnabled: boolean;
  deleteTickerIntervalMSec: number;
}

export const DefaultControlPanelOptions: IConrolPanelOptions = {
  replaceTickersEnabled: true,
  replaceTickerIntervalMSec: ControlPanelDefaults.ReplaceTickerIntervalMSec,
  addTickersEnabled: true,
  addTickerIntervalMSec: ControlPanelDefaults.AddTickerIntervalMSec,
  deleteTickersEnabled: true,
  deleteTickerIntervalMSec: ControlPanelDefaults.DeleteTickerIntervalMSec,
  updateValuesEnabled: true,
  updateValuesIntervalMSec: ControlPanelDefaults.UpdateValuesIntervalMSec
}

function handleControlPanelToggleAction(state: IConrolPanelOptions, action: ControlPanelToggleAction): IConrolPanelOptions {
  switch (action.controlPanelActionType) {
    case ControlPanelActionType.Replace:
      return {
        ...state,
        replaceTickersEnabled: action.enable
      }
    case ControlPanelActionType.Add:
      return {
        ...state,
        addTickersEnabled: action.enable
      }
    case ControlPanelActionType.Delete:
      return {
        ...state,
        deleteTickersEnabled: action.enable
      }
    case ControlPanelActionType.Update:
      return {
        ...state,
        updateValuesEnabled: action.enable
      }
  }
}

function handleControlPanelChangeIntervalAction(state: IConrolPanelOptions, action: ControlPanelChangeIntervalAction): IConrolPanelOptions {
  let interval:number;

  switch (action.controlPanelActionType) {
    case ControlPanelActionType.Replace:
      interval = state.replaceTickerIntervalMSec + (action.increment ? 1 : -1) * ControlPanelDefaults.ReplaceIncrementMsec;
      if (interval < ControlPanelDefaults.ReplaceMinIntervalMsec ) {interval = ControlPanelDefaults.ReplaceMinIntervalMsec;}
      return {
          ...state,
          replaceTickerIntervalMSec: interval
        }
    case ControlPanelActionType.Add:
      interval = state.addTickerIntervalMSec + (action.increment ? 1 : -1) * ControlPanelDefaults.AddIncrementMsec;
      if (interval < ControlPanelDefaults.AddMinIntervalMsec ) { interval = ControlPanelDefaults.AddMinIntervalMsec;}
      return {
          ...state,
          addTickerIntervalMSec: interval
        }
    case ControlPanelActionType.Delete:
      interval = state.deleteTickerIntervalMSec + (action.increment ? 1 : -1) * ControlPanelDefaults.DeleteIncrementMsec;
      if (interval < ControlPanelDefaults.DeleteMinIntervalMsec ) { interval = ControlPanelDefaults.DeleteMinIntervalMsec;}
      return {
          ...state,
          deleteTickerIntervalMSec: interval
        }
    case ControlPanelActionType.Update:
      interval = state.updateValuesIntervalMSec + (action.increment ? 1 : -1) * ControlPanelDefaults.UpdateIncrementMsec;
      if (interval < ControlPanelDefaults.UpdateMinIntervalMsec ) { interval = ControlPanelDefaults.UpdateMinIntervalMsec;}
       return {
        ...state,
        updateValuesIntervalMSec: interval
      }
  }
}

type IConrolPanelReducer = (state: IConrolPanelOptions, action: AppAction) => IConrolPanelOptions;
export const controlPanelReducer: IConrolPanelReducer = (state: IConrolPanelOptions = DefaultControlPanelOptions, action: AppAction): IConrolPanelOptions => {
  switch (action.type) {
    case CONTROLPANEL_TOGGLE_ACTION:
      return handleControlPanelToggleAction(state, <ControlPanelToggleAction>action);
    case CONTROLPANEL_CHANGE_INTERVAL:
      return handleControlPanelChangeIntervalAction(state, <ControlPanelChangeIntervalAction>action);
    default:
      return state;
  }
}

