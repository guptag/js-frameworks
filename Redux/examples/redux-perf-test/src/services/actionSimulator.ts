import appStore from '../redux-core/store/appStore';
import { actions } from '../redux-core/actions/actions';

class ActionSimulator {
  clearAddTickerTimerId: number;
  clearUpdateTickerTimerId: number;
  tickerDataFromServer;
  newTickerIndexToAdd: number;

  constructor() {
    this.tickerDataFromServer = (<any>window).tickerData || []; //for simulation 
    this.newTickerIndexToAdd = -1;
  }

  private addTicker() {
    if (this.newTickerIndexToAdd < this.tickerDataFromServer.length - 1) {
      this.newTickerIndexToAdd++;
      var tickerItem = this.tickerDataFromServer[this.newTickerIndexToAdd];
      appStore.dispatch(actions.ticker.createAddTickerAction((<string>tickerItem.Ticker), {
        ticker: <string>tickerItem.Ticker,
        company: <string>tickerItem.Company,
        change: <number>tickerItem.Change,
        sector: <string>tickerItem.Sector,
        industry: <string>tickerItem.Industry,
        last: <number>tickerItem.Price,
        price: <number>tickerItem.Price,
        sma20: <number>tickerItem.SMA20,
        sma50: <number>tickerItem.SMA50,
        sma200: <number>tickerItem.SMA200,
        volume: <number>tickerItem.Volume,
        avgVol: <number>tickerItem.AvgVol
      }));
      
      this.clearAddTickerTimerId && this.scheduleAddTicker();
    } else {
      this.stopAddingTickers();
    }
  }

  private scheduleAddTicker() {
    this.clearAddTickerTimerId = setTimeout(() => this.addTicker(), 1000 / (appStore.getState().ui.controlPanel.addTickerFrequency || 25));
  }

  private upDateTickerData() {
    const randomActionIndex: number = Math.floor(Math.random() * 3) + 1 ; // 1-3
    const randomTickerIndex: number = this.newTickerIndexToAdd > -1 ? (Math.floor(Math.random() * (this.newTickerIndexToAdd - 1) + 1)) : -1;
    
    if (randomTickerIndex === -1) { return; }

    var dispatchUpdateAction = ((actionIndex, randomTickerIndex) => {
      const tickerDataItem = (<any>window).tickerData[randomTickerIndex];
      const ticker = (<string>tickerDataItem.Ticker);
      let multiplier = Math.random() > 0.5 ? 1 : -1;  
      let changePercent: number = Math.floor(Math.random() * 4); //0 - 3
      
      switch (actionIndex) {
        case 1: 
          const currentPrice: number = appStore.getState().domain.tickersHash[ticker].price;
          const newPrice: number = currentPrice + (multiplier * (currentPrice * changePercent) / 100);
          const newPriceChange: number = newPrice - <number>tickerDataItem.Price;
          appStore.dispatch(actions.ticker.createUpdatePriceAction(<string>tickerDataItem.Ticker, newPrice, newPriceChange));
          break; 

        case 2:
          const newSectorIndex = Math.floor(Math.random() * 5); // 0 -4
          const newSector = ["Technology", "Materials", "Energy", "Utilities", "Industrials"][newSectorIndex];
          appStore.dispatch(actions.ticker.createUpdateSectorAction(<string>tickerDataItem.Ticker, newSector));
          break; 

        case 3:
          const currentVol: number = appStore.getState().domain.tickersHash[ticker].price;
          const newVol: number = currentVol + (multiplier * (currentVol * changePercent) / 100);
          appStore.dispatch(actions.ticker.createUpdateVolumeAction(<string>tickerDataItem.Ticker, newVol));
          break; 
      }
    })(randomActionIndex, randomTickerIndex);

    this.clearUpdateTickerTimerId && this.scheduleUpdateTicker();
  }

  private scheduleUpdateTicker() {
    this.clearUpdateTickerTimerId = setTimeout(() => this.upDateTickerData(), 1000 / (appStore.getState().ui.controlPanel.updateValuesFrequency || 25));
  }

  startAddingTickers() {
    this.scheduleAddTicker();
  }

  stopAddingTickers() {
    this.clearAddTickerTimerId && clearTimeout(this.clearAddTickerTimerId);
    this.clearAddTickerTimerId = null;
  }

  startUpdatingTickers() {
    this.scheduleUpdateTicker();
  }

  stopUpdatingTickers() {
    this.clearUpdateTickerTimerId && clearTimeout(this.clearUpdateTickerTimerId);
    this.clearUpdateTickerTimerId = null;
  }
}

export default new ActionSimulator();