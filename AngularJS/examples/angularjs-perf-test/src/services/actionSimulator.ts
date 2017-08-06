import * as _ from 'lodash';
import { IControlPanelService } from './controlPanelService';
import { ITickerDataService } from './tickerDataService';


export interface IActionSimulator {
  startAddingTickers();
  stopAddingTickers();
  startUpdatingTickers();
  stopUpdatingTickers();
  startReplacingTickers();
  stopReplacingTickers();
  startDeletingTickers();
  stopDeletingTickers();

  resetAddTickerInterval();
  resetUpdateTickerInterval();
  resetReplaceTickerInterval();
  resetDeleteTickerInterval();
}

class ActionSimulator implements IActionSimulator {
  clearAddTickerPromise: ng.IPromise<any>;
  clearUpdateTickerPromise: ng.IPromise<any>;
  clearDeleteTickerPromise: ng.IPromise<any>;
  clearReplaceTickerPromise: ng.IPromise<any>;

  tickerDataFromServer;
  newTickerIndexToAdd: number;

  constructor(
    private tickerDataService: ITickerDataService,
    private controlPanelService: IControlPanelService,
    private $interval: ng.IIntervalService
  ) {
    this.tickerDataFromServer = (<any>window).tickerData || []; //for simulation
    this.newTickerIndexToAdd = -1;
  }

  private addTickers(count: number) {
    if (this.newTickerIndexToAdd >= this.tickerDataFromServer.length - 1) {
      this.tickerDataService.clearAllData();
      this.newTickerIndexToAdd = -1;
    }

    _.times(count, () => {
        if (this.newTickerIndexToAdd < this.tickerDataFromServer.length - 1) {
          this.newTickerIndexToAdd++;
          var tickerItem = this.tickerDataFromServer[this.newTickerIndexToAdd];
          this.tickerDataService.addTicker({
            ticker: <string>tickerItem.Ticker,
            company: <string>tickerItem.Company,
            change: <number>tickerItem.Change || 0,
            sector: <string>tickerItem.Sector,
            last: <number>tickerItem.Price || 0,
            price: <number>tickerItem.Price || 0,
            sma20: Math.abs(<number>tickerItem.SMA20),
            sma50: Math.abs(<number>tickerItem.SMA50),
            sma200: Math.abs(<number>tickerItem.SMA200),
            volume: <number>tickerItem.Volume || 0,
            avgVol: <number>tickerItem.AvgVol
          });
        } else {
          this.stopAddingTickers();
          this.controlPanelService.toggleAddTickers(true);

          this.stopReplacingTickers();
          this.controlPanelService.toggleReplaceTickers(true);

          return false;
        }
    });
  }

  private deleteTickers(count: number) {
    _.times(count, () => {
        if (this.tickerDataService.getTickerCount() > 0) {
          this.tickerDataService.removeTicker(this.tickerDataService.tickerList[this.tickerDataService.tickerList.length - 1]);
        } else {
          this.stopDeletingTickers();
          this.controlPanelService.toggleDeleteTickers(true);
          return false;
        }
    });
  }

  private replaceTickers(count: number) {
    this.tickerDataService.clearAllData();
    this.addTickers(count);
  }


  private upDateTickerData() {
    const randomActionIndex: number = Math.floor(Math.random() * 2) + 1 ; // 1-2
    const randomTickerIndex: number = this.tickerDataService.tickerList.length > 0 ? Math.floor(Math.random() * this.tickerDataService.tickerList.length) : -1;

    if (randomTickerIndex === -1) { 
      this.stopUpdatingTickers();
      this.controlPanelService.toggleUpdateValues(true);
      return;
    }

    var dispatchUpdateAction = ((actionIndex, randomTickerIndex) => {
      const ticker = this.tickerDataService.tickerList[randomTickerIndex];
      const tickerDataItem = this.tickerDataService.tickerHash[ticker];
      let multiplier = Math.random() > 0.5 ? 1 : -1;
      let changePercent: number = Math.floor(Math.random() * 4); //0 - 3

      switch (actionIndex) {
        case 1:
          const currentPrice: number = this.tickerDataService.tickerHash[ticker].price;
          const newPrice: number = currentPrice + (multiplier * (currentPrice * changePercent) / 100);
          const newPriceChange: number = newPrice - <number>tickerDataItem.price;
          this.tickerDataService.updatePrice(ticker, newPrice, newPriceChange);
          break;

        case 2:
          const currentVol: number = tickerDataItem.volume;
          const newVol: number = Math.floor(currentVol + (multiplier * (currentVol * changePercent) / 100));
          this.tickerDataService.updateVolume(ticker, newVol);
          break;
      }
    })(randomActionIndex, randomTickerIndex);
  }

  private scheduleAddTicker() {
    this.clearAddTickerPromise = this.$interval(() => this.addTickers(50), this.controlPanelService.options.addTickerIntervalMSec || 100);
  }

  private clearAddTicker() {
    this.clearAddTickerPromise && this.$interval.cancel(this.clearAddTickerPromise);
    this.clearAddTickerPromise = null;
  }

  private scheduleUpdateTicker() {
    this.clearUpdateTickerPromise = this.$interval(() => this.upDateTickerData(), this.controlPanelService.options.updateValueIntervalMSec || 100);
  }

  private clearUpdateTicker() {
    this.clearUpdateTickerPromise && this.$interval.cancel(this.clearUpdateTickerPromise);
    this.clearUpdateTickerPromise = null;
  }

  private scheduleDeleteTicker() {
    this.clearDeleteTickerPromise = this.$interval(() => this.deleteTickers(50), this.controlPanelService.options.deleteTickerIntervalMSec || 100);
  }

  private clearDeleteTicker() {
    this.clearDeleteTickerPromise && this.$interval.cancel(this.clearDeleteTickerPromise);
    this.clearDeleteTickerPromise = null;
  }

  private scheduleReplaceTicker() {
    this.clearReplaceTickerPromise = this.$interval(() => this.replaceTickers(200), this.controlPanelService.options.replaceTickerIntervalMSec || 100);
  }

  private clearReplaceTicker() {
    this.clearReplaceTickerPromise && this.$interval.cancel(this.clearReplaceTickerPromise);
    this.clearReplaceTickerPromise = null;
  }

  resetAddTickerInterval() {
    if (this.clearAddTickerPromise) {
      this.clearAddTicker();
      this.scheduleAddTicker();
    }
  }

  resetUpdateTickerInterval() {
    if (this.clearUpdateTickerPromise) {
      this.clearUpdateTicker();
      this.scheduleUpdateTicker();
    }
  }

  resetDeleteTickerInterval() {
    if (this.clearDeleteTickerPromise) {
      this.clearDeleteTicker();
      this.scheduleDeleteTicker();
    }
  }

  resetReplaceTickerInterval() {
    if (this.clearUpdateTickerPromise) {
      this.clearReplaceTicker();
      this.scheduleReplaceTicker();
    }
  }

  startAddingTickers() {
    this.scheduleAddTicker();
  }

  stopAddingTickers() {
    this.clearAddTicker();
  }

  startUpdatingTickers() {
    this.scheduleUpdateTicker();
  }

  stopUpdatingTickers() {
    this.clearUpdateTicker();
  }

  startReplacingTickers() {
    this.scheduleReplaceTicker();
  }

  stopReplacingTickers() {
    this.clearReplaceTicker();
  }

  startDeletingTickers() {
    this.scheduleDeleteTicker();
  }

  stopDeletingTickers() {
    this.clearDeleteTicker();
  }
}

angular.module('perfTest')
      .service('actionSimulator', ActionSimulator);