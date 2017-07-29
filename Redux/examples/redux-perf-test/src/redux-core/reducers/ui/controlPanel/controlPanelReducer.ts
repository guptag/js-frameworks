import  {
  ReduxAction,
  TOGGLE_ADD_TICKERS,
  CHANGE_ADD_TICKER_FREQUENCY,
  TOGGLE_UPDATE_VALUES,
  CHANGE_UPDATE_VALUES_FREQUENCY
} from '../../../actions/actions';

export interface IConrolPanelState {
  addTickersEnabled: boolean;
  addTickerFrequency: number;
  updateValuesEnabled: boolean;
  updateValuesFrequency: number;
}

type IConrolPanelReducer = (state: IConrolPanelState, action: ReduxAction) => IConrolPanelState;
export const controlPanelReducer: IConrolPanelReducer = (state: IConrolPanelState, action: ReduxAction): IConrolPanelState => {
  switch (action.type) {
    case TOGGLE_ADD_TICKERS:
      return {
        ...state,
        addTickersEnabled: state.addTickersEnabled
      }
    case TOGGLE_UPDATE_VALUES:
      return {
        ...state,
        updateValuesEnabled: state.updateValuesEnabled
      }
    case CHANGE_ADD_TICKER_FREQUENCY:
      return {
        ...state,
        addTickerFrequency: action.frequency
      }
    case CHANGE_UPDATE_VALUES_FREQUENCY:
       return {
        ...state,
        updateValuesFrequency: action.frequency
      }
    default:
      return state;
  }
}

