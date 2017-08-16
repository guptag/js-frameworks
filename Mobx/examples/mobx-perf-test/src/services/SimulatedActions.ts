import * as _ from 'lodash';
import {IServerDataManager} from './serverDataManager';
import {ITickerDataViewModel, ITickerData} from '../models/TickerDataModel';
import {IControlPanelViewModel} from '../models/ControlPanelModel';
import { ControlPanelActionType, ControlPanelDefaults, ActionDefaults } from "../config/config";
import { IObservableArray, observable } from 'mobx';

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
    private controlPanelViewModel: IControlPanelViewModel,
    private tickerDataViewModel: ITickerDataViewModel,
    private serverDataManager: IServerDataManager,
    private resetReplaceAction?: () => void
  ) {

  }

  scheduleAction(clearExistingData: boolean = true) {
    if (clearExistingData) {
      this.tickerDataViewModel.clearAllTickers();
      this.serverDataManager.resetIndex();
    }
    this.resetReplaceAction && this.resetReplaceAction();
    this.clearAddTickerTimerId = setInterval(() => this.addTickers(), this.controlPanelViewModel.options.addTickerIntervalMSec);
  }

  clearAction () {
    this.clearAddTickerTimerId && clearInterval(this.clearAddTickerTimerId);
    this.clearAddTickerTimerId = null;
  }

  resetAction () {
    if (this.clearAddTickerTimerId) {
      this.clearAction();
      this.scheduleAction(false);
    }
  }

  private addTickers() {
    var newTickers: ITickerData[] = this.serverDataManager.getNewTickers(ActionDefaults.AddActionTickerCount);
    this.tickerDataViewModel.addTickers(newTickers);

    // reached the end, reset the buttons
    if (this.serverDataManager.hasReachedEnd()) {
      this.clearAction();
      this.controlPanelViewModel.toggleAction(ControlPanelActionType.Add, true);
      this.resetReplaceAction && this.resetReplaceAction();
    }
  }
}

/**
 * Simulates Replace Tickers
 */
export class ReplaceTickerAction implements ISimulatedAction {
  private clearReplaceTickerTimerId:number
  constructor(
    private controlPanelViewModel: IControlPanelViewModel,
    private tickerDataViewModel: ITickerDataViewModel,
    private serverDataManager: IServerDataManager,
    private resetAddAction?: () => void
  ) {

  }

  scheduleAction(clearExistingData: boolean = true) {
    if (clearExistingData) {
      this.tickerDataViewModel.clearAllTickers();
      this.serverDataManager.resetIndex();
    }
    this.resetAddAction && this.resetAddAction();
    this.clearReplaceTickerTimerId = setInterval(() => this.replaceTickers(), this.controlPanelViewModel.options.replaceTickerIntervalMSec);
  }

  clearAction () {
    this.clearReplaceTickerTimerId && clearInterval(this.clearReplaceTickerTimerId);
    this.clearReplaceTickerTimerId = null;
  }

  resetAction () {
    if (this.clearReplaceTickerTimerId) {
      this.clearAction();
      this.scheduleAction(false);
    }
  }

  private replaceTickers() {
    var newTickers: ITickerData[] = this.serverDataManager.getNewTickers(ActionDefaults.ReplaceActionTickerCount);
    this.tickerDataViewModel.replaceTickers(newTickers);

    // reached the end, reset the buttons
    if (this.serverDataManager.hasReachedEnd()) {
      this.clearAction();
      this.controlPanelViewModel.toggleAction(ControlPanelActionType.Replace, true);
      this.resetAddAction && this.resetAddAction();
    }
  }
}

/**
 * Simulates Delete Tickers
 */
export class DeleteTickerAction implements ISimulatedAction {
  private clearDeleteTickerTimerId: number;
  constructor(
    private controlPanelViewModel: IControlPanelViewModel,
    private tickerDataViewModel: ITickerDataViewModel,
  ) {

  }

  scheduleAction() {
    this.clearDeleteTickerTimerId = setInterval(() => this.deleteTickers(),this.controlPanelViewModel.options.deleteTickerIntervalMSec || 100);
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
    var tickerList:IObservableArray<string> = this.tickerDataViewModel.tickerList;

    if (tickerList.length === 0) {
      this.clearAction();
      this.controlPanelViewModel.toggleAction(ControlPanelActionType.Delete, true);
    } else {
      this.tickerDataViewModel.deleteTickers(_.takeRight(tickerList.slice(), ActionDefaults.DeleteActionTickerCount));
    }
  }
}

/**
 * Simulates Update Tickers
 */
export class UpdateTickerAction implements ISimulatedAction {
  private clearUpdateTickerTimerId: number;

  constructor(
    private controlPanelViewModel: IControlPanelViewModel,
    private tickerDataViewModel: ITickerDataViewModel
  ) {

  }

  scheduleAction() {
    this.clearUpdateTickerTimerId = setInterval(() => this.upDateTickerData(), this.controlPanelViewModel.options.updateValuesIntervalMSec);
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
    const tickerList = this.tickerDataViewModel.tickerList;
    const randomActionIndex: number = Math.floor(Math.random() * 2) + 1 ; // 1-2
    const randomTickerIndex: number = tickerList.length > 0 ? Math.floor(Math.random() * tickerList.length) : -1;

    if (randomTickerIndex === -1) {
      this.clearAction();
      this.controlPanelViewModel.toggleAction(ControlPanelActionType.Update, true);
      return;
    }

    const ticker = tickerList[randomTickerIndex];
    const tickerDataItem = this.tickerDataViewModel.tickerHash.get(ticker);
    let multiplier = Math.random() > 0.5 ? 1 : -1;
    let changePercent: number = Math.floor(Math.random() * 5); //0 - 4

    switch (randomActionIndex) {
      case 1:
        const currentPrice: number = this.tickerDataViewModel.tickerHash.get(ticker).price;
        const newPrice: number = currentPrice + (multiplier * (currentPrice * changePercent) / 100);
        const newPriceChange: number = newPrice - <number>tickerDataItem.price;
        this.tickerDataViewModel.updatePrice(ticker, newPrice, newPriceChange);
        break;

      case 2:
        const currentVol: number = this.tickerDataViewModel.tickerHash.get(ticker).volume;
        const newVol: number = Math.floor(currentVol + (multiplier * (currentVol * changePercent) / 100));
        this.tickerDataViewModel.updateVolume(ticker, newVol);
        break;
    }
  }
}
