import {ITickerData, ITickerList} from '../reducers/domain/tickers/tickersReducer';
import {ControlPanelActionType} from '../config/config';

export type Action<T, P> = {
  type: T,
  payload: P
};

export type ReplaceTickerAction = Action<typeof REPLACE_TICKERS, ReplaceTickerPayload>;
export const REPLACE_TICKERS = "REPLACE_TICKERS";
export interface ReplaceTickerPayload {
  tickerData: ITickerData[];
}

export type AddTickerAction = Action<typeof ADD_TICKERS, AddTickerPayload>;
export const ADD_TICKERS = "ADD_TICKERS";
export interface AddTickerPayload {
  tickersToAdd: ITickerData[];
}

export type DeleteTickerAction = Action<typeof DELETE_TICKERS, DeleteTickerPayload>;
export const DELETE_TICKERS = "DELETE_TICKERS";
export interface DeleteTickerPayload {
  tickersToDelete: ITickerList
}

export type UpdatePriceAction = Action<typeof UPDATE_PRICE, UpdatePricePayload>;
export const UPDATE_PRICE = "UPDATE_PRICE";
export interface UpdatePricePayload {
  ticker: string;
  price: number;
  change: number;
}

export type UpdateVolumeAction = Action<typeof UPDATE_VOLUME, UpdateVolumePayload>;
export const UPDATE_VOLUME = "UPDATE_VOLUME";
export interface UpdateVolumePayload {
  ticker: string;
  volume: number;
}

export type ControlPanelToggleAction = Action<typeof CONTROLPANEL_TOGGLE_ACTION, ControlPanelTogglePayload>;
export const CONTROLPANEL_TOGGLE_ACTION = "CONTROLPANEL_TOGGLE_ACTION";
export interface ControlPanelTogglePayload {
  controlPanelActionType: ControlPanelActionType;
  enable: boolean
}

export type ControlPanelChangeIntervalAction = Action<typeof CONTROLPANEL_CHANGE_INTERVAL, ControlPanelChangeIntervalPayload>;
export const CONTROLPANEL_CHANGE_INTERVAL = "CONTROLPANEL_CHANGE_INTERVAL";
export interface ControlPanelChangeIntervalPayload {
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
        payload: {
          tickersToAdd: tickersToAdd
        }
      }
    },

    createDeleteTickerAction: (tickersToDelete: ITickerList): DeleteTickerAction  => {
      return {
        type: DELETE_TICKERS,
        payload: {
          tickersToDelete: tickersToDelete
        }
      }
    },

    createReplaceTickerAction: (tickerData: ITickerData[]): ReplaceTickerAction  => {
      return {
        type: REPLACE_TICKERS,
        payload: {
          tickerData: tickerData
        }
      }
    },

    createUpdatePriceAction: (ticker: string, price: number, change: number): UpdatePriceAction  => {
      return {
        type: UPDATE_PRICE,
        payload: {
          ticker: ticker,
          price: price,
          change: change
        }
      }
    },

    createUpdateVolumeAction: (ticker: string, volume: number): UpdateVolumeAction  => {
      return {
        type: UPDATE_VOLUME,
        payload: {
          ticker: ticker,
          volume: volume
        }
      }
    }
  },

  controlPanel: {
    createToggleAction: (controlPanelActionType: ControlPanelActionType, enable: boolean): ControlPanelToggleAction => {
      return  {
        type: CONTROLPANEL_TOGGLE_ACTION,
        payload: {
          controlPanelActionType: controlPanelActionType,
          enable: enable
        }
      }
    },

    createChangeIntervalAction: (controlPanelActionType: ControlPanelActionType, increment: boolean): ControlPanelChangeIntervalAction => {
      return  {
        type: CONTROLPANEL_CHANGE_INTERVAL,
        payload: {
          controlPanelActionType: controlPanelActionType,
          increment: increment
        }
      }
    }
  }
}

