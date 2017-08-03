import appStore from '../redux-core/store/appStore';
import { actions } from '../redux-core/actions/actions';

declare function require(name:string);
var Perf = require('react-addons-perf');

class ActionSimulator {
  clearAddTickerTimerId: number;
  clearUpdateTickerTimerId: number;
  tickerDataFromServer;
  newTickerIndexToAdd: number;

  currentAddTickerInterval: number;
  currentUpdateTickerInterval: number;

  measuringPerf: boolean;

  constructor() {
    this.tickerDataFromServer = (<any>window).tickerData || []; //for simulation
    this.newTickerIndexToAdd = -1;
  }

  private addTicker() {
    if (this.newTickerIndexToAdd < this.tickerDataFromServer.length - 1) {
      this.newTickerIndexToAdd++;

      var tickerItem = this.tickerDataFromServer[this.newTickerIndexToAdd];
      if (!tickerItem) { return; }

      appStore.dispatch(actions.ticker.createAddTickerAction((<string>tickerItem.Ticker), {
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
      }));

      // UI state changed, reconfigure the timer
      if (this.currentAddTickerInterval !== appStore.getState().ui.controlPanel.addTickerIntervalMSec) {
        this.clearAddTicker();
        this.scheduleAddTicker();
      }
    } else {
      this.stopAddingTickers();
      appStore.dispatch(actions.controlPanel.createToggleAddTickerAction(false));
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
      let changePercent: number = Math.floor(Math.random() * 5); //0 - 4

      switch (actionIndex) {
        case 1:
          const currentPrice: number = appStore.getState().domain.tickersHash[ticker].price;
          const newPrice: number = currentPrice + (multiplier * (currentPrice * changePercent) / 100);
          const newPriceChange: number = newPrice - <number>tickerDataItem.Price;
          appStore.dispatch(actions.ticker.createUpdatePriceAction(<string>tickerDataItem.Ticker, newPrice, newPriceChange));
          break;

        case 2:
          const currentVol: number = appStore.getState().domain.tickersHash[ticker].volume;
          const newVol: number = Math.floor(currentVol + (multiplier * (currentVol * changePercent) / 100));
          appStore.dispatch(actions.ticker.createUpdateVolumeAction(<string>tickerDataItem.Ticker, newVol));
          break;
      }
    })(randomActionIndex, randomTickerIndex);

     // UI state changed, reconfigure the timer
    if (this.currentUpdateTickerInterval !== appStore.getState().ui.controlPanel.updateValuesIntervalMSec) {
      this.clearUpdateTicker();
      this.scheduleUpdateTicker();
    }
  }

  private scheduleAddTicker() {
    this.currentAddTickerInterval = appStore.getState().ui.controlPanel.addTickerIntervalMSec || 100;
    this.clearAddTickerTimerId = setInterval(() => this.addTicker(), this.currentAddTickerInterval);
  }

  private clearAddTicker() {
    this.clearAddTickerTimerId && clearInterval(this.clearAddTickerTimerId);
    this.clearAddTickerTimerId = null;
  }

  private scheduleUpdateTicker() {
    this.currentUpdateTickerInterval = appStore.getState().ui.controlPanel.updateValuesIntervalMSec || 100;
    this.clearUpdateTickerTimerId = setInterval(() => this.upDateTickerData(), this.currentUpdateTickerInterval);
  }

  private clearUpdateTicker() {
    this.clearUpdateTickerTimerId && clearInterval(this.clearUpdateTickerTimerId);
    this.clearUpdateTickerTimerId = null;
  }

  startAddingTickers() {
    this.scheduleAddTicker();
    this.startPerf();
  }

  stopAddingTickers() {
    this.clearAddTicker();
    this.endPerf();
  }

  startUpdatingTickers() {
    this.scheduleUpdateTicker();
    this.startPerf();
  }

  stopUpdatingTickers() {
    this.clearUpdateTicker();
    this.endPerf();
  }

  startPerf() {
    // eanble for debugging; will impact perf/memory numbers

    /*if (!this.measuringPerf) {
      this.measuringPerf = true;
      Perf.start();
   }*/
  }

  endPerf() {
    /*this.measuringPerf = false;

    Perf.stop();

    console.log("Inclusive");
    Perf.printInclusive();

    console.log("Exclusive");
    Perf.printExclusive();

    console.log("Wasted");
    Perf.printWasted();*/

    //console.log("Dom Operations");
    //Perf.printOperations();
  }
}

export default new ActionSimulator();