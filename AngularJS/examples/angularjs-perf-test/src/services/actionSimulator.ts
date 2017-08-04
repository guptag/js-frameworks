import { IControlPanelService } from './controlPanelService';
import { ITickerDataService } from './tickerDataService';

export interface IActionSimulator {
  startAddingTickers();
  stopAddingTickers();
  startUpdatingTickers();
  stopUpdatingTickers();
}

class ActionSimulator implements IActionSimulator {
  clearAddTickerPromise: ng.IPromise<any>;
  clearUpdateTickerPromise: ng.IPromise<any>;
  tickerDataFromServer;
  newTickerIndexToAdd: number;

  perfTracking: boolean;
  currentAddTickerInterval: number;
  currentUpdateTickerInterval: number;

  constructor(
    private tickerDataService: ITickerDataService,
    private controlPanelService: IControlPanelService,
    private $interval: ng.IIntervalService
  ) {
    this.tickerDataFromServer = (<any>window).tickerData || []; //for simulation
    this.newTickerIndexToAdd = -1;
  }

  private addTicker() {
    if (this.newTickerIndexToAdd < this.tickerDataFromServer.length - 1) {
      this.newTickerIndexToAdd++;
      var tickerItem = this.tickerDataFromServer[this.newTickerIndexToAdd];
      this.tickerDataService.addTicker({
        ticker: <string>tickerItem.Ticker,
        company: <string>tickerItem.Company,
        change: <number>tickerItem.Change || 0,
        sector: <string>tickerItem.Sector,
        industry: <string>tickerItem.Industry,
        last: <number>tickerItem.Price || 0,
        price: <number>tickerItem.Price || 0,
        sma20: <number>tickerItem.SMA20,
        sma50: <number>tickerItem.SMA50,
        sma200: <number>tickerItem.SMA200,
        volume: <number>tickerItem.Volume || 0,
        avgVol: <number>tickerItem.AvgVol
      });

      // UI state changed, reconfigure the timer
      if (this.currentAddTickerInterval !== this.controlPanelService.options.addTickerIntervalMSec) {
        this.clearAddTicker();
        this.scheduleAddTicker();
      }
    } else {
      this.stopAddingTickers();
      this.controlPanelService.toggleAddTickers(false);
    }
  }

  private upDateTickerData() {
    const randomActionIndex: number = Math.floor(Math.random() * 2) + 1 ; // 1-2
    const randomTickerIndex: number = this.newTickerIndexToAdd > -1 ? Math.floor(Math.random() * (this.newTickerIndexToAdd + 1)) : -1;

    if (randomTickerIndex === -1) { return; }

    var dispatchUpdateAction = ((actionIndex, randomTickerIndex) => {
      const tickerDataItem = (<any>window).tickerData[randomTickerIndex];
      const ticker = (<string>tickerDataItem.Ticker);
      let multiplier = Math.random() > 0.5 ? 1 : -1;
      let changePercent: number = Math.floor(Math.random() * 4); //0 - 3

      switch (actionIndex) {
        case 1:
          const currentPrice: number = this.tickerDataService.tickerHash[ticker].price;
          const newPrice: number = currentPrice + (multiplier * (currentPrice * changePercent) / 100);
          const newPriceChange: number = newPrice - <number>tickerDataItem.Price;
          this.tickerDataService.updatePrice(ticker, newPrice, newPriceChange);
          break;

        case 2:
          const currentVol: number = this.tickerDataService.tickerHash[ticker].volume;
          const newVol: number = Math.floor(currentVol + (multiplier * (currentVol * changePercent) / 100));
          this.tickerDataService.updateVolume(ticker, newVol);
          break;
      }
    })(randomActionIndex, randomTickerIndex);

     // UI state changed, reconfigure the timer
    if (this.currentUpdateTickerInterval !== this.controlPanelService.options.updateValueIntervalMSec) {
      this.clearUpdateTicker();
      this.scheduleUpdateTicker();
    }
  }

  private scheduleAddTicker() {
    this.currentAddTickerInterval = this.controlPanelService.options.addTickerIntervalMSec || 100;
    this.clearAddTickerPromise = this.$interval(() => this.addTicker(), this.currentAddTickerInterval);
  }

  private clearAddTicker() {
    this.clearAddTickerPromise && this.$interval.cancel(this.clearAddTickerPromise);
    this.clearAddTickerPromise = null;
  }

  private scheduleUpdateTicker() {
    this.currentUpdateTickerInterval = this.controlPanelService.options.updateValueIntervalMSec || 100;
    this.clearUpdateTickerPromise = this.$interval(() => this.upDateTickerData(), this.currentUpdateTickerInterval);
  }

  private clearUpdateTicker() {
    this.clearUpdateTickerPromise && this.$interval.cancel(this.clearUpdateTickerPromise);
    this.clearUpdateTickerPromise = null;
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
}

angular.module('perfTest')
      .service('actionSimulator', ActionSimulator);