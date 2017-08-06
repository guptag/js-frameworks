import * as _ from 'lodash';

export interface ITickerData {
  ticker: string;
  company: string;
  change: number;
  sector: string;
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
  removeTicker(ticker: string): void;
  addTicker(tickerData: ITickerData): void;
  updatePrice(ticker: string, price: number, change: number): void;
  updateVolume(ticker: string, volumne: number);
  clearAllData(): void;
  getTickerCount(): number;
  tickerHash:ITickerHash;
  tickerList: string[];
}

class TickerDataService implements ITickerDataService {
  public tickerHash:ITickerHash = {};
  public tickerList: string[] = [];

  constructor() {

  }

  getTickerCount(): number {
    return this.tickerList.length;
  }

  addTicker(tickerData: ITickerData): void {
    if (!this.tickerHash[tickerData.ticker]) {
      this.tickerHash[tickerData.ticker] = tickerData;
      this.tickerList.push(tickerData.ticker);
    }
  }

  removeTicker(ticker: string): void {
    if (this.tickerHash[ticker]) {
      delete this.tickerHash[ticker];
      _.pull(this.tickerList, ticker);
    }
  }

  clearAllData(): void {
    this.tickerList = [];
    this.tickerHash = {};
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