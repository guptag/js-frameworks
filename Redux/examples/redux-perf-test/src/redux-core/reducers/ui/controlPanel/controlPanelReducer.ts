import  {
  AppAction,
  TOGGLE_REPLACE_TICKERS,
  CHANGE_REPLACE_TICKER_DELAY,
  TOGGLE_ADD_TICKERS,
  CHANGE_ADD_TICKER_DELAY,
  TOGGLE_DELETE_TICKERS,
  CHANGE_DELETE_TICKER_DELAY,
  TOGGLE_UPDATE_VALUES,
  CHANGE_UPDATE_VALUES_DELAY
} from '../../../actions/actions';

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

type IConrolPanelReducer = (state: IConrolPanelOptions, action: AppAction) => IConrolPanelOptions;
export const controlPanelReducer: IConrolPanelReducer = (state: IConrolPanelOptions = DefaultControlPanelOptions, action: AppAction): IConrolPanelOptions => {
  switch (action.type) {
    case TOGGLE_REPLACE_TICKERS:
      return {
        ...state,
        replaceTickersEnabled: action.enable
      }
    case TOGGLE_ADD_TICKERS:
      return {
        ...state,
        addTickersEnabled: action.enable
      }
    case TOGGLE_DELETE_TICKERS:
      return {
        ...state,
        deleteTickersEnabled: action.enable
      }
    case TOGGLE_UPDATE_VALUES:
      return {
        ...state,
        updateValuesEnabled: action.enable
      }
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

