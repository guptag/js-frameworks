import * as _ from 'lodash';
import { Store, Dispatch } from 'redux'
import { IAppState } from '../redux-core/reducers/appReducer';
import appStore  from '../redux-core/store/appStore';
import { actions } from '../redux-core/actions/actions';
import { ITickerData, ITickerList } from '../redux-core/reducers/domain/tickers/tickersReducer';
import { ControlPanelActionType, ControlPanelDefaults, ActionDefaults } from "../redux-core/config/config";
import {IServerDataManager} from './serverDataManager';

export interface ISimulatedAction {
  scheduleAction();
  clearAction();
  resetAction();
}


/**
 * Simulates Add Tickers
 */
export class AddTickerAction implements ISimulatedAction {
  private clearAddTickerTimerId: number;

  constructor(
    private appStore: Store<IAppState>,
    private serverDataManager: IServerDataManager,
    private cbWhenReachedEnd?: () => void
  ) {

  }

  scheduleAction() {
    this.cbWhenReachedEnd && this.cbWhenReachedEnd();
    this.clearAddTickerTimerId = setInterval(() => this.addTickers(), appStore.getState().ui.controlPanel.addTickerIntervalMSec || 100);
  }

  clearAction () {
    this.clearAddTickerTimerId && clearInterval(this.clearAddTickerTimerId);
    this.clearAddTickerTimerId = null;
  }

  resetAction () {
    if (this.clearAddTickerTimerId) {
      this.clearAction();
      this.scheduleAction();
    }
  }

  private addTickers() {
    // already at the end, clear the data and start
    if (this.serverDataManager.hasReachedEnd()) {
      this.appStore.dispatch(actions.ticker.createReplaceTickerAction([]));
      this.serverDataManager.resetIndex();
    }

    var newTickers: ITickerData[] = this.serverDataManager.getNewTickers(ActionDefaults.AddActionTickerCount);
    this.appStore.dispatch(actions.ticker.createAddTickerAction(newTickers));

    // reached the end, reset the buttons
    if (this.serverDataManager.hasReachedEnd()) {
      this.clearAction();
      this.appStore.dispatch(actions.controlPanel.createToggleAction(ControlPanelActionType.Add, true));

      this.cbWhenReachedEnd && this.cbWhenReachedEnd();
    }
  }
}

/**
 * Simulates Replace Tickers
 */
export class ReplaceTickerAction implements ISimulatedAction {
  private clearReplaceTickerTimerId:number
  constructor(
    private appStore: Store<IAppState>,
    private serverDataManager: IServerDataManager,
    private cbWhenReachedEnd?: () => void
  ) {

  }

  scheduleAction() {
    this.cbWhenReachedEnd && this.cbWhenReachedEnd();
    this.clearReplaceTickerTimerId = setInterval(() => this.replaceTickers(), appStore.getState().ui.controlPanel.replaceTickerIntervalMSec || 100);
  }

  clearAction () {
    this.clearReplaceTickerTimerId && clearInterval(this.clearReplaceTickerTimerId);
    this.clearReplaceTickerTimerId = null;
  }

  resetAction () {
    if (this.clearReplaceTickerTimerId) {
      this.clearAction();
      this.scheduleAction();
    }
  }

  private replaceTickers() {
    // already at the end, clear the data and start
    if (this.serverDataManager.hasReachedEnd()) {
      this.appStore.dispatch(actions.ticker.createReplaceTickerAction([]));
      this.serverDataManager.resetIndex();
    }

    var newTickers: ITickerData[] = this.serverDataManager.getNewTickers(ActionDefaults.ReplaceActionTickerCount);
    this.appStore.dispatch(actions.ticker.createReplaceTickerAction(newTickers));

    // reached the end, reset the buttons
    if (this.serverDataManager.hasReachedEnd()) {
      this.clearAction();
      this.appStore.dispatch(actions.controlPanel.createToggleAction(ControlPanelActionType.Replace, true));
      this.cbWhenReachedEnd && this.cbWhenReachedEnd();
    }
  }
}

/**
 * Simulates Delete Tickers
 */
export class DeleteTickerAction implements ISimulatedAction {
  private clearDeleteTickerTimerId: number;
  constructor(
    private appStore: Store<IAppState>
  ) {

  }

  scheduleAction() {
    this.clearDeleteTickerTimerId = setInterval(() => this.deleteTickers(), appStore.getState().ui.controlPanel.deleteTickerIntervalMSec || 100);
  }

  clearAction () {
    this.clearDeleteTickerTimerId && clearInterval(this.clearDeleteTickerTimerId);
    this.clearDeleteTickerTimerId = null;
  }

  resetAction () {
    if (this.clearDeleteTickerTimerId) {
      this.clearAction();
      this.scheduleAction();
    }
  }

  private deleteTickers() {
    var tickerList:ITickerList = this.appStore.getState().domain.tickersState.tickerList;

    if (tickerList.length === 0) {
      this.clearAction();
      appStore.dispatch(actions.controlPanel.createToggleAction(ControlPanelActionType.Delete, true));
    } else {
      appStore.dispatch(actions.ticker.createDeleteTickerAction(_.takeRight(tickerList, ActionDefaults.DeleteActionTickerCount)));
    }
  }
}

/**
 * Simulates Update Tickers
 */
export class UpdateTickerAction implements ISimulatedAction {
  private clearUpdateTickerTimerId: number;

  constructor(
    private appStore: Store<IAppState>
  ) {

  }

  scheduleAction() {
    this.clearUpdateTickerTimerId = setInterval(() => this.upDateTickerData(), appStore.getState().ui.controlPanel.updateValuesIntervalMSec || 100);
  }

  clearAction () {
    this.clearUpdateTickerTimerId && clearInterval(this.clearUpdateTickerTimerId);
    this.clearUpdateTickerTimerId = null;
  }

  resetAction () {
    if (this.clearUpdateTickerTimerId) {
      this.clearAction();
      this.scheduleAction();
    }
  }

  private upDateTickerData() {
    const tickerList = appStore.getState().domain.tickersState.tickerList;
    const randomActionIndex: number = Math.floor(Math.random() * 2) + 1 ; // 1-2
    const randomTickerIndex: number = tickerList.length > 0 ? Math.floor(Math.random() * tickerList.length) : -1;

    if (randomTickerIndex === -1) {
      this.clearAction();
      this.appStore.dispatch(actions.controlPanel.createToggleAction(ControlPanelActionType.Update, true));
      return;
    }

    const ticker = tickerList[randomTickerIndex];
    const tickerDataItem = appStore.getState().domain.tickersState.tickerHash[ticker];
    let multiplier = Math.random() > 0.5 ? 1 : -1;
    let changePercent: number = Math.floor(Math.random() * 5); //0 - 4

    switch (randomActionIndex) {
      case 1:
        const currentPrice: number = appStore.getState().domain.tickersState.tickerHash[ticker].price;
        const newPrice: number = currentPrice + (multiplier * (currentPrice * changePercent) / 100);
        const newPriceChange: number = newPrice - <number>tickerDataItem.price;
        this.appStore.dispatch(actions.ticker.createUpdatePriceAction(<string>tickerDataItem.ticker, newPrice, newPriceChange));
        break;

      case 2:
        const currentVol: number = appStore.getState().domain.tickersState.tickerHash[ticker].volume;
        const newVol: number = Math.floor(currentVol + (multiplier * (currentVol * changePercent) / 100));
        this.appStore.dispatch(actions.ticker.createUpdateVolumeAction(<string>tickerDataItem.ticker, newVol));
        break;
    }
  }
}
