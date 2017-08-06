import * as _ from 'lodash';
import appStore from '../redux-core/store/appStore';
import { actions } from '../redux-core/actions/actions';
import { ITickerData, ITickerList } from '../redux-core/reducers/domain/tickers/tickersReducer';

declare function require(name:string);
var Perf = require('react-addons-perf');

class ActionSimulator {
  clearAddTickerTimerId: number;
  clearUpdateTickerTimerId: number;
  clearReplaceTickerTimerId: number;
  clearDeleteTickerTimerId: number;

  tickerDataFromServer;
  newTickerIndexToAdd: number;
  
  currentAddTickerInterval: number;
  currentReplaceTickerInterval: number;
  currentDeleteTickerInterval: number;
  currentUpdateTickerInterval: number;

  measuringPerf: boolean;

  constructor() {
    this.tickerDataFromServer = (<any>window).tickerData || []; //for simulation
    this.newTickerIndexToAdd = -1;
  }

  private addTickers(count: number, replace: boolean) {
    console.log("addtickers");

    // already at the end, clear the data and start
    if (this.newTickerIndexToAdd >= this.tickerDataFromServer.length - 1) {
      appStore.dispatch(actions.ticker.createReplaceTickerAction([]));
      this.newTickerIndexToAdd = -1;
    }

    let tickersToAdd: ITickerData[] = [];
    _.times(count, () => {
      if (this.newTickerIndexToAdd < this.tickerDataFromServer.length - 1) {
        this.newTickerIndexToAdd++;
        var tickerItem = this.tickerDataFromServer[this.newTickerIndexToAdd];
        tickersToAdd.push({
          ticker: <string>tickerItem.Ticker,
          company: <string>tickerItem.Company,
          change: <number>tickerItem.Change || 0,
          sector: <string>tickerItem.Sector,
          last: <number>tickerItem.Price || 0,
          price: <number>tickerItem.Price || 0,
          sma20: Math.abs(<number>tickerItem.SMA20 || 0),
          sma50: Math.abs(<number>tickerItem.SMA50 || 0),
          sma200: Math.abs(<number>tickerItem.SMA200 || 0),
          volume: <number>tickerItem.Volume || 0,
          avgVol: <number>tickerItem.AvgVol
        });
      }  
    });
    
    if (replace) {
      appStore.dispatch(actions.ticker.createReplaceTickerAction(tickersToAdd));
    } else {
      appStore.dispatch(actions.ticker.createAddTickerAction(tickersToAdd));
    }

    // reached the end, reset the buttons
    if (this.newTickerIndexToAdd >= this.tickerDataFromServer.length - 1) {
      this.stopAddingTickers();
      appStore.dispatch(actions.controlPanel.createToggleAddTickerAction(true));

      this.stopReplacingTickers();
      appStore.dispatch(actions.controlPanel.createToggleReplaceTickerAction(true));
    }
  }

  private upDateTickerData() {
    const tickerList = appStore.getState().domain.tickersState.tickerList;
    const randomActionIndex: number = Math.floor(Math.random() * 2) + 1 ; // 1-2
    const randomTickerIndex: number = tickerList.length > 0 ? Math.floor(Math.random() * tickerList.length) : -1;

    if (randomTickerIndex === -1) { 
      this.stopUpdatingTickers();
      appStore.dispatch(actions.controlPanel.createToggleUpdateValuesAction(true));
      return;
    }

    var dispatchUpdateAction = ((actionIndex, randomTickerIndex) => {
      const ticker = tickerList[randomTickerIndex];
      const tickerDataItem = appStore.getState().domain.tickersState.tickerHash[ticker];
      let multiplier = Math.random() > 0.5 ? 1 : -1;
      let changePercent: number = Math.floor(Math.random() * 5); //0 - 4

      switch (actionIndex) {
        case 1:
          const currentPrice: number = appStore.getState().domain.tickersState.tickerHash[ticker].price;
          const newPrice: number = currentPrice + (multiplier * (currentPrice * changePercent) / 100);
          const newPriceChange: number = newPrice - <number>tickerDataItem.price;
          appStore.dispatch(actions.ticker.createUpdatePriceAction(<string>tickerDataItem.ticker, newPrice, newPriceChange));
          break;

        case 2:
          const currentVol: number = appStore.getState().domain.tickersState.tickerHash[ticker].volume;
          const newVol: number = Math.floor(currentVol + (multiplier * (currentVol * changePercent) / 100));
          appStore.dispatch(actions.ticker.createUpdateVolumeAction(<string>tickerDataItem.ticker, newVol));
          break;
      }
    })(randomActionIndex, randomTickerIndex);
  }

  private deleteTickers(count: number) {
    var tickerList:ITickerList = appStore.getState().domain.tickersState.tickerList;
    
    if (tickerList.length === 0) {
      this.stopDeletingTickers();
      appStore.dispatch(actions.controlPanel.createToggleDeleteTickerAction(true));
    } else {
      appStore.dispatch(actions.ticker.createDeleteTickerAction(_.takeRight(tickerList, count)));
    }
  }

  private scheduleAddTicker() {
    this.currentAddTickerInterval = appStore.getState().ui.controlPanel.addTickerIntervalMSec || 100;
    this.clearAddTickerTimerId = setInterval(() => this.addTickers(50, false), this.currentAddTickerInterval);
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

  private scheduleDeleteTicker() {
    this.clearDeleteTickerTimerId = setInterval(() => this.deleteTickers(50), appStore.getState().ui.controlPanel.deleteTickerIntervalMSec || 100);
  }

  private clearDeleteTicker() {
    this.clearDeleteTickerTimerId && clearInterval(this.clearDeleteTickerTimerId);
    this.clearDeleteTickerTimerId = null;
  }

  private scheduleReplaceTicker() {
    this.clearReplaceTickerTimerId = setInterval(() => this.addTickers(200, true), appStore.getState().ui.controlPanel.replaceTickerIntervalMSec || 100);
  }

  private clearReplaceTicker() {
    this.clearReplaceTickerTimerId && clearInterval(this.clearReplaceTickerTimerId);
    this.clearReplaceTickerTimerId = null;
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

  startReplacingTickers() {
    this.scheduleReplaceTicker();
    this.startPerf();
  }

  stopReplacingTickers() {
    this.clearReplaceTicker();
    this.endPerf();
  }

  startDeletingTickers() {
    this.scheduleDeleteTicker();
    this.startPerf();
  }

  stopDeletingTickers() {
    this.clearDeleteTicker();
    this.endPerf();
  }

  resetAddTickerInterval() {
    if (this.clearAddTickerTimerId) {
      this.clearAddTicker();
      this.scheduleAddTicker();
    }
  }

  resetUpdateTickerInterval() {
    if (this.clearUpdateTickerTimerId) {
      this.clearUpdateTicker();
      this.scheduleUpdateTicker();
    }
  }

  resetDeleteTickerInterval() {
    if (this.clearDeleteTickerTimerId) {
      this.clearDeleteTicker();
      this.scheduleDeleteTicker();
    }
  }

  resetReplaceTickerInterval() {
    if (this.clearReplaceTickerTimerId) {
      this.clearReplaceTicker();
      this.scheduleReplaceTicker();
    }
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