/*

export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const CHANGE_BASE_CURRENCY = 'CHANGE_BASE_CURRENCY';

type Action = { type: typeof INCREASE_COUNTER }
| { type: typeof CHANGE_BASE_CURRENCY, payload: string };

*/

// https://github.com/reactjs/redux/issues/992

import {ITickerData} from '../reducers/domain/tickers/tickersReducer';

export type ADD_TICKER = "ADD_TICKER";
export const ADD_TICKER:ADD_TICKER = "ADD_TICKER";
export interface AddTickerAction {
  type: ADD_TICKER,
  ticker: string;
  tickerData:ITickerData;
}

export type UPDATE_PRICE = "UPDATE_PRICE";
export const UPDATE_PRICE:UPDATE_PRICE = "UPDATE_PRICE";
export interface UpdatePriceAction {
  type: UPDATE_PRICE,
  ticker: string;
  price: number;
  change: number;
}

export type UPDATE_VOLUME = "UPDATE_VOLUME";
export const UPDATE_VOLUME:UPDATE_VOLUME = "UPDATE_VOLUME";
export interface UpdateVolumeAction {
  type: UPDATE_VOLUME,
  ticker: string;
  volume: number;
}

export type UPDATE_SECTOR = "UPDATE_SECTOR";
export const UPDATE_SECTOR:UPDATE_SECTOR = "UPDATE_SECTOR";
export interface UpdateSectorAction {
  type: UPDATE_SECTOR,
  ticker: string;
  sector: string;
}

export type TOGGLE_ADD_TICKERS = "TOGGLE_ADD_TICKERS";
export const TOGGLE_ADD_TICKERS:TOGGLE_ADD_TICKERS = "TOGGLE_ADD_TICKERS";
export interface ToggleAddTickerAction {
  type: TOGGLE_ADD_TICKERS
}


export type CHANGE_ADD_TICKER_FREQUENCY = "CHANGE_ADD_TICKER_FREQUENCY";
export const CHANGE_ADD_TICKER_FREQUENCY:CHANGE_ADD_TICKER_FREQUENCY = "CHANGE_ADD_TICKER_FREQUENCY";
export interface ChangeAddTickerFrequencyAction {
  type: CHANGE_ADD_TICKER_FREQUENCY,
  frequency: number;
}


export type TOGGLE_UPDATE_VALUES = "TOGGLE_UPDATE_VALUES";
export const TOGGLE_UPDATE_VALUES:TOGGLE_UPDATE_VALUES = "TOGGLE_UPDATE_VALUES";
export interface ToggleUpdateValuesAction {
  type: TOGGLE_UPDATE_VALUES
}

export type CHANGE_UPDATE_VALUES_FREQUENCY = "CHANGE_UPDATE_VALUES_FREQUENCY";
export const CHANGE_UPDATE_VALUES_FREQUENCY:CHANGE_UPDATE_VALUES_FREQUENCY = "CHANGE_UPDATE_VALUES_FREQUENCY";
export interface ChangeUpdateValuesFrequencyAction {
  type: CHANGE_UPDATE_VALUES_FREQUENCY,
  frequency: number;
}

export type AppAction = AddTickerAction |
                        UpdatePriceAction |
                        UpdateVolumeAction |
                        ToggleAddTickerAction |
                        ChangeAddTickerFrequencyAction |
                        ToggleUpdateValuesAction |
                        ChangeUpdateValuesFrequencyAction |
                        UpdateSectorAction;


export const actions = {
  ticker: {
    createAddTickerAction: (ticker: string, tickerData: ITickerData): AddTickerAction  => {
      return {
        type: ADD_TICKER,
        ticker: ticker,
        tickerData: tickerData
      }
    },

    createUpdatePriceAction: (ticker: string, price: number, change: number): UpdatePriceAction  => {
      return {
        type: UPDATE_PRICE,
        ticker: ticker,
        price: price,
        change: change
      }
    },

    createUpdateVolumeAction: (ticker: string, volume: number): UpdateVolumeAction  => {
      return {
        type: UPDATE_VOLUME,
        ticker: ticker,
        volume: volume
      }
    },

    createUpdateSectorAction: (ticker: string, sector: string): UpdateSectorAction  => {
      return {
        type: UPDATE_SECTOR,
        sector: sector,
        ticker: ticker
      }
    }
  },

  controlPanel: {
    createToggleAddTickerAction: (): ToggleAddTickerAction => {
      return  {
        type: TOGGLE_ADD_TICKERS
      }
    },

    createChangeAddTickerFrequencyAction: (frequency: number): ChangeAddTickerFrequencyAction => {
      return  {
        type: CHANGE_ADD_TICKER_FREQUENCY,
        frequency: frequency
      }
    },

    createToggleUpdateValuesAction: (): ToggleUpdateValuesAction => {
      return  {
        type: TOGGLE_UPDATE_VALUES
      }
    },

    createChangeUpdatesFrequencyAction: (frequency: number): ChangeUpdateValuesFrequencyAction => {
      return  {
        type: CHANGE_UPDATE_VALUES_FREQUENCY,
        frequency: frequency
      }
    }
  }
}

