/*

export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const CHANGE_BASE_CURRENCY = 'CHANGE_BASE_CURRENCY';

type Action = { type: typeof INCREASE_COUNTER }
| { type: typeof CHANGE_BASE_CURRENCY, payload: string };

*/

// https://github.com/reactjs/redux/issues/992

import {ITickerData, ITickerList} from '../reducers/domain/tickers/tickersReducer';
import {ControlPanelActionType} from '../config/config';

export type REPLACE_TICKER = "REPLACE_TICKER";
export const REPLACE_TICKER:REPLACE_TICKER = "REPLACE_TICKER";
export interface ReplaceTickerAction {
  type: REPLACE_TICKER,
  tickerData: ITickerData[];
}

export type ADD_TICKER = "ADD_TICKER";
export const ADD_TICKER:ADD_TICKER = "ADD_TICKER";
export interface AddTickerAction {
  type: ADD_TICKER,
  tickersToAdd: ITickerData[];
}

export type DELETE_TICKER = "DELETE_TICKER";
export const DELETE_TICKER:DELETE_TICKER = "DELETE_TICKER";
export interface DeleteTickerAction {
  type: DELETE_TICKER,
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

export type TOGGLE_CONTROLPANEL_ACTION = "TOGGLE_CONTROLPANEL_ACTION";
export const TOGGLE_CONTROLPANEL_ACTION:TOGGLE_CONTROLPANEL_ACTION = "TOGGLE_CONTROLPANEL_ACTION";
export interface ToggleControlPanelAction {
  type: TOGGLE_CONTROLPANEL_ACTION;
  controlPanelActionType: ControlPanelActionType;
  enable: boolean
}

export type CHANGE_REPLACE_TICKER_DELAY = "CHANGE_REPLACE_TICKER_DELAY";
export const CHANGE_REPLACE_TICKER_DELAY:CHANGE_REPLACE_TICKER_DELAY = "CHANGE_REPLACE_TICKER_DELAY";
export interface ChangeReplaceTickerDelayAction {
  type: CHANGE_REPLACE_TICKER_DELAY,
  delayMS: number;
}


export type CHANGE_ADD_TICKER_DELAY = "CHANGE_ADD_TICKER_DELAY";
export const CHANGE_ADD_TICKER_DELAY:CHANGE_ADD_TICKER_DELAY = "CHANGE_ADD_TICKER_DELAY";
export interface ChangeAddTickerDelayAction {
  type: CHANGE_ADD_TICKER_DELAY,
  delayMS: number;
}

export type CHANGE_DELETE_TICKER_DELAY = "CHANGE_DELETE_TICKER_DELAY";
export const CHANGE_DELETE_TICKER_DELAY:CHANGE_DELETE_TICKER_DELAY = "CHANGE_DELETE_TICKER_DELAY";
export interface ChangeDeleteTickerDelayAction {
  type: CHANGE_DELETE_TICKER_DELAY,
  delayMS: number;
}


export type CHANGE_UPDATE_VALUES_DELAY = "CHANGE_UPDATE_VALUES_DELAY";
export const CHANGE_UPDATE_VALUES_DELAY:CHANGE_UPDATE_VALUES_DELAY = "CHANGE_UPDATE_VALUES_DELAY";
export interface ChangeUpdateValuesDelayAction {
  type: CHANGE_UPDATE_VALUES_DELAY,
  delayMS: number;
}

export type AppAction = ReplaceTickerAction |
                        AddTickerAction |
                        DeleteTickerAction |
                        UpdatePriceAction |
                        UpdateVolumeAction |
                        ChangeReplaceTickerDelayAction |
                        ToggleControlPanelAction |
                        ChangeAddTickerDelayAction |
                        ChangeDeleteTickerDelayAction |
                        ChangeUpdateValuesDelayAction;


export const actions = {
  ticker: {
    createAddTickerAction: (tickersToAdd: ITickerData[]): AddTickerAction  => {
      return {
        type: ADD_TICKER,
        tickersToAdd: tickersToAdd
      }
    },

    createDeleteTickerAction: (tickersToDelete: ITickerList): DeleteTickerAction  => {
      return {
        type: DELETE_TICKER,
        tickersToDelete: tickersToDelete
      }
    },

    createReplaceTickerAction: (tickerData: ITickerData[]): ReplaceTickerAction  => {
      return {
        type: REPLACE_TICKER,
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
    createToggleAction: (actionType: ControlPanelActionType, enable: boolean): ToggleControlPanelAction => {
      return  {
        type: TOGGLE_CONTROLPANEL_ACTION,
        controlPanelActionType: actionType,
        enable: enable
      }
    },

    createChangeReplaceTickerDelayAction: (delayMS: number): ChangeReplaceTickerDelayAction => {
      return  {
        type: CHANGE_REPLACE_TICKER_DELAY,
        delayMS: delayMS
      }
    },

    createChangeAddTickerDelayAction: (delayMS: number): ChangeAddTickerDelayAction => {
      return  {
        type: CHANGE_ADD_TICKER_DELAY,
        delayMS: delayMS
      }
    },

    createChangeDeleteTickerDelayAction: (delayMS: number): ChangeDeleteTickerDelayAction => {
      return  {
        type: CHANGE_DELETE_TICKER_DELAY,
        delayMS: delayMS
      }
    },

    createChangeUpdatesDelayAction: (delayMS: number): ChangeUpdateValuesDelayAction => {
      return  {
        type: CHANGE_UPDATE_VALUES_DELAY,
        delayMS: delayMS
      }
    }
  }
}

