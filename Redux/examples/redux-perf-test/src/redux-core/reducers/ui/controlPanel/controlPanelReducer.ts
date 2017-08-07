import  {
  AppAction,
  ToggleControlPanelAction,
  TOGGLE_CONTROLPANEL_ACTION,
  CHANGE_REPLACE_TICKER_DELAY,
  CHANGE_ADD_TICKER_DELAY,
  CHANGE_DELETE_TICKER_DELAY,
  CHANGE_UPDATE_VALUES_DELAY
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
  replaceTickerIntervalMSec: 500,
  addTickersEnabled: true,
  addTickerIntervalMSec: 100,
  deleteTickersEnabled: true,
  deleteTickerIntervalMSec: 100,
  updateValuesEnabled: true,
  updateValuesIntervalMSec: 10
}

function handleToggleControlPanelAction(state: IConrolPanelOptions, action: ToggleControlPanelAction): IConrolPanelOptions {
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

type IConrolPanelReducer = (state: IConrolPanelOptions, action: AppAction) => IConrolPanelOptions;
export const controlPanelReducer: IConrolPanelReducer = (state: IConrolPanelOptions = DefaultControlPanelOptions, action: AppAction): IConrolPanelOptions => {
  switch (action.type) {
    case TOGGLE_CONTROLPANEL_ACTION:
      return handleToggleControlPanelAction(state, <ToggleControlPanelAction>action);
    case CHANGE_REPLACE_TICKER_DELAY:
      if (action.delayMS < 50 ) {action.delayMS = 50;}
      return {
          ...state,
          replaceTickerIntervalMSec: action.delayMS
        }
    case CHANGE_ADD_TICKER_DELAY:
      if (action.delayMS < 50 ) {action.delayMS = 50;}
      return {
          ...state,
          addTickerIntervalMSec: action.delayMS
        }
    case CHANGE_DELETE_TICKER_DELAY:
      if (action.delayMS < 50 ) {action.delayMS = 50;}
      return {
          ...state,
          deleteTickerIntervalMSec: action.delayMS
        }
    case CHANGE_UPDATE_VALUES_DELAY:
       if (action.delayMS < 5 ) {action.delayMS = 5;}
       return {
        ...state,
        updateValuesIntervalMSec: action.delayMS
      }
    default:
      return state;
  }
}

