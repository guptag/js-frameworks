/*

export function goodReducer(state: State = initialState, action: Action): State {
  let partialState: Partial<State> | undefined;

  if (action.type === INCREASE_COUNTER) {
    partialState = {
      counterTypoError: state.counter + 1, // Error: Object literal may only specify known properties, and 'counterTypoError' does not exist in type 'Partial<State>'.
    }; // now it's showing a typo error correctly
  }
  if (action.type === CHANGE_BASE_CURRENCY) {
    partialState = { // Error: Types of property 'baseCurrency' are incompatible. Type 'number' is not assignable to type 'string'.
      baseCurrency: 5,
    }; // type errors also works fine
  }

  return partialState != null ? { ...state, ...partialState } : state;
}
*/

import  {
  AppAction,
  ADD_TICKER,
  UPDATE_VOLUME,
  UPDATE_PRICE,
  UPDATE_SECTOR
} from '../../../actions/actions';

export interface ITickerData {
  ticker: string;
  company: string;
  change: number;
  sector: string;
  industry: string;
  last: number;
  price: number;
  sma20: number;
  sma50: number;
  sma200: number;
  volume: number;
  avgVol: number;
}

export type ITickerHash = { [ticker: string]: ITickerData; };

export const DefaultTickersState: ITickerHash = {};

type ITickersReducer = (state: ITickerHash, action: AppAction) => ITickerHash;
export const tickersReducer: ITickersReducer = (state: ITickerHash = DefaultTickersState, action: AppAction): ITickerHash => {
  switch (action.type) {
    case ADD_TICKER:
      return {
        ...state,
        [action.ticker]: action.tickerData
      }
    case UPDATE_PRICE:
      return {
        ...state,
        [action.ticker]: {
          ...state[action.ticker],
          change: action.change,
          price: action.price
        }
      };
    case UPDATE_VOLUME:
      return {
        ...state,
        [action.ticker]: {
          ...state[action.ticker],
          volume: action.volume
        }
      };
    case UPDATE_SECTOR:
      return {
        ...state,
        [action.ticker]: {
          ...state[action.ticker],
          sector: action.sector
        }
      };
    default:
      return state;
  }
}
