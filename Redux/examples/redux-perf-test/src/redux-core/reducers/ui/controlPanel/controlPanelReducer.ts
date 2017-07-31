import  {
  AppAction,
  TOGGLE_ADD_TICKERS,
  CHANGE_ADD_TICKER_FREQUENCY,
  TOGGLE_UPDATE_VALUES,
  CHANGE_UPDATE_VALUES_FREQUENCY
} from '../../../actions/actions';

export interface IConrolPanelOptions {
  addTickersEnabled: boolean;
  addTickerFrequency: number;
  updateValuesEnabled: boolean;
  updateValuesFrequency: number;
}

export const DefaultControlPanelOptions: IConrolPanelOptions = {
  addTickersEnabled: true,
  addTickerFrequency: 50,
  updateValuesEnabled: true,
  updateValuesFrequency: 50
}

type IConrolPanelReducer = (state: IConrolPanelOptions, action: AppAction) => IConrolPanelOptions;
export const controlPanelReducer: IConrolPanelReducer = (state: IConrolPanelOptions = DefaultControlPanelOptions, action: AppAction): IConrolPanelOptions => {
  switch (action.type) {
    case TOGGLE_ADD_TICKERS:
      return {
        ...state,
        addTickersEnabled: !state.addTickersEnabled
      }
    case TOGGLE_UPDATE_VALUES:
      return {
        ...state,
        updateValuesEnabled: !state.updateValuesEnabled
      }
    case CHANGE_ADD_TICKER_FREQUENCY:
    if (action.frequency > 1000 ) {action.frequency = 1000;}
    if (action.frequency < 10 ) {action.frequency = 10;}
    return {
        ...state,
        addTickerFrequency: action.frequency
      }
    case CHANGE_UPDATE_VALUES_FREQUENCY:
       if (action.frequency > 1000 ) {action.frequency = 1000;}
       if (action.frequency < 10 ) {action.frequency = 10;}
       return {
        ...state,
        updateValuesFrequency: action.frequency
      }
    default:
      return state;
  }
}

