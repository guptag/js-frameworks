export interface ITickerData {
  ticker: string;
  company: string;
  change: number;
  sector: string;
  industry: string;
  last: number;
  price: number;
  sma20: number;
  sma50: number;
  sma200: number;
  volume: number;
  avgVol: number;
}

export type ITickerHash = { [ticker: string]: ITickerData; };

export interface ITickerDataService {
  addTicker(tickerData: ITickerData): void;
  updatePrice(ticker: string, price: number, change: number): void;
  updateVolume(ticker: string, volumne: number);
  getTickerCount(): number
  tickerHash:ITickerHash;
}

class TickerDataService implements ITickerDataService {
  public tickerHash:ITickerHash = {};

  constructor() {

  }

  getTickerCount(): number {
    return Object.keys(this.tickerHash).length;
  }

  addTicker(tickerData: ITickerData): void {
    if (!this.tickerHash[tickerData.ticker]) {
      this.tickerHash[tickerData.ticker] = tickerData;
    }
  }

  updatePrice(ticker: string, price: number, change: number): void {
    let tickerData: ITickerData = this.tickerHash[ticker];
    if (tickerData) {
      tickerData.price = price;
      tickerData.change = change;
    }
  }

  public updateVolume(ticker: string, volume: number): void {
    let tickerData: ITickerData = this.tickerHash[ticker];
    if (tickerData) {
      tickerData.volume = volume;
    }
  }
}

angular.module('perfTest')
      .service('tickerDataService', TickerDataService);