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

import * as _ from "lodash";

import  {
  AppAction,
  ADD_TICKER,
  DELETE_TICKER,
  REPLACE_TICKER,
  UPDATE_VOLUME,
  UPDATE_PRICE
} from '../../../actions/actions';

export interface ITickerData {
  ticker: string;
  company: string;
  change: number;
  sector: string;
  last: number;
  price: number;
  sma20: number;
  sma50: number;
  sma200: number;
  volume: number;
  avgVol: number;
}

export type ITickerList = string[];
export type ITickerHash = { [ticker: string]: ITickerData; };

export interface ITickerState {
  tickerList: ITickerList;
  tickerHash: ITickerHash;
}

export const DefaultTickersState = {
  tickerList: [],
  tickerHash: {}
};

type ITickersReducer = (state: ITickerState, action: AppAction) => ITickerState;
export const tickersReducer: ITickersReducer = (state: ITickerState = DefaultTickersState, action: AppAction): ITickerState => {
  switch (action.type) {
    case REPLACE_TICKER: 
      return {
        tickerList: _.map(action.tickerData, data => data.ticker),
        tickerHash: Object.assign({}, 
          ..._.map(action.tickerData, data => <ITickerHash>{ [data.ticker]: data })
        )
      };

    case ADD_TICKER:
      return {
        tickerList: [...state.tickerList, ..._.map(action.tickersToAdd, data => data.ticker)],
        tickerHash: Object.assign({}, 
          state.tickerHash,
          ..._.map(action.tickersToAdd, data => <ITickerHash>{ [data.ticker]: data })
        )
      }

    case DELETE_TICKER:
      return {
        tickerList: _.without(state.tickerList, ...action.tickersToDelete),
        tickerHash: Object.assign({}, 
          state.tickerHash,
          ..._.map(action.tickersToDelete, ticker => <ITickerHash>{ [ticker]: null })
        )
      }
      
    case UPDATE_PRICE:
      return {
        tickerList: state.tickerList,
        tickerHash: {
          ...state.tickerHash,
          [action.ticker]: {
            ...state.tickerHash[action.ticker],
            change: action.change,
            price: action.price
          }
        }
      };

    case UPDATE_VOLUME:
      return {
        tickerList: state.tickerList,
        tickerHash: {
          ...state.tickerHash,
          [action.ticker]: {
            ...state.tickerHash[action.ticker],
            volume: action.volume
          }
        }
      };
    default:
      return state;
  }
}
