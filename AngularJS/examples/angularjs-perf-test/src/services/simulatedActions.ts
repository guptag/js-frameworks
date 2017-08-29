import * as _ from 'lodash';
import { IServerDataManager } from './serverDataManager';
import { ITickerDataService, ITickerData, ITickerList } from './tickerDataService';
import { IControlPanelService } from './controlPanelService';
import { ControlPanelActionType, ControlPanelDefaults, ActionDefaults } from "../config/config";


export interface ISimulatedAction {
  scheduleAction();
  clearAction();
  resetAction();
}


/**
 * Simulates Add Tickers
 */
export class AddTickerAction implements ISimulatedAction {
  private clearIntervalPromise: ng.IPromise<any>;

  constructor(
    private $interval: ng.IIntervalService,
    private controlPanelService: IControlPanelService,
    private tickerDataService: ITickerDataService,
    private serverDataManager: IServerDataManager,
    private resetOtherActions?: () => void
  ) {

  }

  scheduleAction(clearExistingData: boolean = true) {
    if (clearExistingData) {
      this.tickerDataService.clearAllTickers();
      this.serverDataManager.resetIndex();
    }
    this.resetOtherActions && this.resetOtherActions();
    this.clearIntervalPromise = this.$interval(() => this.addTickers(), this.controlPanelService.options.addTickerIntervalMSec);
  }

  clearAction () {
    this.clearIntervalPromise && this.$interval.cancel(this.clearIntervalPromise);
    this.clearIntervalPromise = null;
  }

  resetAction () {
    if (this.clearIntervalPromise) {
      this.clearAction();
      this.scheduleAction(false);
    }
  }

  private addTickers() {
    var newTickers: ITickerData[] = this.serverDataManager.getNewTickers(ActionDefaults.AddActionTickerCount);
    this.tickerDataService.addTickers(newTickers);

    // reached the end, reset the buttons
    if (this.serverDataManager.hasReachedEnd()) {
      this.clearAction();
      this.controlPanelService.toggleAction(ControlPanelActionType.Add, true);
      this.resetOtherActions && this.resetOtherActions();
    }
  }
}

/**
 * Simulates Replace Tickers
 */
export class ReplaceTickerAction implements ISimulatedAction {
  private clearReplaceTickerPromise: ng.IPromise<any>;

  constructor(
    private $interval: ng.IIntervalService,
    private controlPanelViewModel: IControlPanelService,
    private tickerDataViewModel: ITickerDataService,
    private serverDataManager: IServerDataManager,
    private resetOtherActions?: () => void
  ) {

  }

  scheduleAction(clearExistingData: boolean = true) {
    if (clearExistingData) {
      this.tickerDataViewModel.clearAllTickers();
      this.serverDataManager.resetIndex();
    }
    this.resetOtherActions && this.resetOtherActions();
    this.clearReplaceTickerPromise = this.$interval(() => this.replaceTickers(), this.controlPanelViewModel.options.replaceTickerIntervalMSec);
  }

  clearAction () {
    this.clearReplaceTickerPromise && this.$interval.cancel(this.clearReplaceTickerPromise);
    this.clearReplaceTickerPromise = null;
  }

  resetAction () {
    if (this.clearReplaceTickerPromise) {
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
      this.resetOtherActions && this.resetOtherActions();
    }
  }
}

/**
 * Simulates Delete Tickers
 */
export class DeleteTickerAction implements ISimulatedAction {
  private clearDeleteTickerPromise: ng.IPromise<any>;

  constructor(
    private $interval: ng.IIntervalService,
    private controlPanelService: IControlPanelService,
    private tickerDataService: ITickerDataService,
    private resetOtherActions?: () => void
  ) {

  }

  scheduleAction() {
    this.resetOtherActions && this.resetOtherActions();
    this.clearDeleteTickerPromise = this.$interval(() => this.deleteTickers(),this.controlPanelService.options.deleteTickerIntervalMSec || 100);
  }

  clearAction () {
    this.clearDeleteTickerPromise && this.$interval.cancel(this.clearDeleteTickerPromise);
    this.clearDeleteTickerPromise = null;
  }

  resetAction () {
    if (this.clearDeleteTickerPromise) {
      this.clearAction();
      this.scheduleAction();
    }
  }

  private deleteTickers() {
    var tickerList: ITickerList = this.tickerDataService.tickerList;

    if (tickerList.length === 0) {
      this.clearAction();
      this.controlPanelService.toggleAction(ControlPanelActionType.Delete, true);
    } else {
      this.tickerDataService.deleteTickers(_.takeRight(tickerList.slice(), ActionDefaults.DeleteActionTickerCount));
    }
  }
}

/**
 * Simulates Update Tickers
 */
export class UpdateTickerAction implements ISimulatedAction {
  private clearUpdateTickerPromise: ng.IPromise<any>;

  constructor(
    private $interval: ng.IIntervalService,
    private controlPanelViewModel: IControlPanelService,
    private tickerDataViewModel: ITickerDataService
  ) {

  }

  scheduleAction() {
    this.clearUpdateTickerPromise = this.$interval(() => this.upDateTickerData(), this.controlPanelViewModel.options.updateValuesIntervalMSec);
  }

  clearAction () {
    this.clearUpdateTickerPromise && this.$interval.cancel(this.clearUpdateTickerPromise);
    this.clearUpdateTickerPromise = null;
  }

  resetAction () {
    if (this.clearUpdateTickerPromise) {
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
    const tickerDataItem = this.tickerDataViewModel.tickerHash[ticker];
    let multiplier = Math.random() > 0.5 ? 1 : -1;
    let changePercent: number = Math.floor(Math.random() * 5); //0 - 4

    switch (randomActionIndex) {
      case 1:
        const currentPrice: number = this.tickerDataViewModel.tickerHash[ticker].price;
        const newPrice: number = currentPrice + (multiplier * (currentPrice * changePercent) / 100);
        const newPriceChange: number = newPrice - <number>tickerDataItem.price;
        this.tickerDataViewModel.updatePrice(ticker, newPrice, newPriceChange);
        break;

      case 2:
        const currentVol: number = this.tickerDataViewModel.tickerHash[ticker].volume;
        const newVol: number = Math.floor(currentVol + (multiplier * (currentVol * changePercent) / 100));
        this.tickerDataViewModel.updateVolume(ticker, newVol);
        break;
    }
  }
}
