/*export const ActionTypes = {
  tickers: {
    UPDATE_PRICE: "UPDATE_PRICE",
    UPDATE_VOLUME: "UPDATE_VOLUME",
    UPDATE_PE: "UPDATE_PE",
    ADD_TICKER: "ADD_TICKER",
    REMOVE_TICKER: "REMOVE_TICKER"
  },
  controlPanel: {
    TOGGLE_ADD_TICKER: "TOGGLE_ADD_TICKERS",
    CHANGE_ADD_TICKER_FREQUENCY: "CHANGE_ADD_TICKER_FREQUENCY",
    TOGGLE_UPDATE_TICKER: "TOGGLE_UPDATE_TICKERS",
    CHANGE_UPDATE_TICKER_FREQUENCY: "CHANGE_UPDATE_TICKER_FREQUENCY",
  }
}; */

// https://github.com/reactjs/redux/issues/992

// couldn't find an alternative to get rid of these double declarations
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
export interface ToggleAddTickerFrequencyAction {
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
export interface ToggleUpdateValuesFrequencyAction {
  type: CHANGE_UPDATE_VALUES_FREQUENCY,
  frequency: number;
}

// won't scale well
export type ReduxAction = UpdatePriceAction |
                          UpdateVolumeAction |
                          ToggleAddTickerAction |
                          ToggleAddTickerFrequencyAction |
                          ToggleUpdateValuesAction |
                          ToggleUpdateValuesFrequencyAction |
                          UpdateSectorAction;


export const Actions = {
  ticker: {
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

    createAddTickerFrequencyAction: (frequency: number): ToggleAddTickerFrequencyAction => {
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

    createUpdateValuesFrequencyAction: (frequency: number): ToggleUpdateValuesFrequencyAction => {
      return  {
        type: CHANGE_UPDATE_VALUES_FREQUENCY,
        frequency: frequency
      }
    }
  }
}

