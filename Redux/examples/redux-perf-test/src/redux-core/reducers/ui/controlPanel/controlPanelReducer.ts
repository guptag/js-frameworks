import  {
  AppAction,
  TOGGLE_ADD_TICKERS,
  CHANGE_ADD_TICKER_DELAY,
  TOGGLE_UPDATE_VALUES,
  CHANGE_UPDATE_VALUES_DELAY
} from '../../../actions/actions';

export interface IConrolPanelOptions {
  addTickersEnabled: boolean;
  addTickerDelayMsec: number;
  updateValuesEnabled: boolean;
  updateValuesDelayMsec: number;
}

export const DefaultControlPanelOptions: IConrolPanelOptions = {
  addTickersEnabled: true,
  addTickerDelayMsec: 40,
  updateValuesEnabled: true,
  updateValuesDelayMsec: 20
}

type IConrolPanelReducer = (state: IConrolPanelOptions, action: AppAction) => IConrolPanelOptions;
export const controlPanelReducer: IConrolPanelReducer = (state: IConrolPanelOptions = DefaultControlPanelOptions, action: AppAction): IConrolPanelOptions => {
  switch (action.type) {
    case TOGGLE_ADD_TICKERS:
      return {
        ...state,
        addTickersEnabled: action.enable
      }
    case TOGGLE_UPDATE_VALUES:
      return {
        ...state,
        updateValuesEnabled: action.enable
      }
    case CHANGE_ADD_TICKER_DELAY:
    if (action.delayMS < 20 ) {action.delayMS = 20;}
    return {
        ...state,
        addTickerDelayMsec: action.delayMS
      }
    case CHANGE_UPDATE_VALUES_DELAY:
       if (action.delayMS < 10 ) {action.delayMS = 10;}
       return {
        ...state,
        updateValuesDelayMsec: action.delayMS
      }
    default:
      return state;
  }
}

