/*

export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const CHANGE_BASE_CURRENCY = 'CHANGE_BASE_CURRENCY';

type Action = { type: typeof INCREASE_COUNTER }
| { type: typeof CHANGE_BASE_CURRENCY, payload: string };

*/

// https://github.com/reactjs/redux/issues/992

import {ITickerData, ITickerList} from '../reducers/domain/tickers/tickersReducer';
import {ControlPanelActionType} from '../config/config';

export type REPLACE_TICKERS = "REPLACE_TICKERS";
export const REPLACE_TICKERS:REPLACE_TICKERS = "REPLACE_TICKERS";
export interface ReplaceTickerAction {
  type: REPLACE_TICKERS,
  tickerData: ITickerData[];
}

export type ADD_TICKERS = "ADD_TICKERS";
export const ADD_TICKERS:ADD_TICKERS = "ADD_TICKERS";
export interface AddTickerAction {
  type: ADD_TICKERS,
  tickersToAdd: ITickerData[];
}

export type DELETE_TICKERS = "DELETE_TICKERS";
export const DELETE_TICKERS:DELETE_TICKERS = "DELETE_TICKERS";
export interface DeleteTickerAction {
  type: DELETE_TICKERS,
  tickersToDelete: ITickerList
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

export type CONTROLPANEL_TOGGLE_ACTION = "CONTROLPANEL_TOGGLE_ACTION";
export const CONTROLPANEL_TOGGLE_ACTION:CONTROLPANEL_TOGGLE_ACTION = "CONTROLPANEL_TOGGLE_ACTION";
export interface ControlPanelToggleAction {
  type: CONTROLPANEL_TOGGLE_ACTION;
  controlPanelActionType: ControlPanelActionType;
  enable: boolean
}

export type CONTROLPANEL_CHANGE_INTERVAL = "CONTROLPANEL_CHANGE_INTERVAL";
export const CONTROLPANEL_CHANGE_INTERVAL:CONTROLPANEL_CHANGE_INTERVAL = "CONTROLPANEL_CHANGE_INTERVAL";
export interface ControlPanelChangeIntervalAction {
  type: CONTROLPANEL_CHANGE_INTERVAL,
  controlPanelActionType: ControlPanelActionType,
  increment: boolean;
}

export type AppAction = ReplaceTickerAction |
                        AddTickerAction |
                        DeleteTickerAction |
                        UpdatePriceAction |
                        UpdateVolumeAction |
                        ControlPanelToggleAction |
                        ControlPanelChangeIntervalAction;


export const actions = {
  ticker: {
    createAddTickerAction: (tickersToAdd: ITickerData[]): AddTickerAction  => {
      return {
        type: ADD_TICKERS,
        tickersToAdd: tickersToAdd
      }
    },

    createDeleteTickerAction: (tickersToDelete: ITickerList): DeleteTickerAction  => {
      return {
        type: DELETE_TICKERS,
        tickersToDelete: tickersToDelete
      }
    },

    createReplaceTickerAction: (tickerData: ITickerData[]): ReplaceTickerAction  => {
      return {
        type: REPLACE_TICKERS,
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
    }
  },

  controlPanel: {
    createToggleAction: (controlPanelActionType: ControlPanelActionType, enable: boolean): ControlPanelToggleAction => {
      return  {
        type: CONTROLPANEL_TOGGLE_ACTION,
        controlPanelActionType: controlPanelActionType,
        enable: enable
      }
    },

    createChangeIntervalAction: (controlPanelActionType: ControlPanelActionType, increment: boolean): ControlPanelChangeIntervalAction => {
      return  {
        type: CONTROLPANEL_CHANGE_INTERVAL,
        controlPanelActionType: controlPanelActionType,
        increment: increment
      }
    }
  }
}

