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
export type ITickerList = string[];

export interface ITickerDataService {
  replaceTickers(tickerDataList: ITickerData[]): void;
  deleteTickers(tickers: string[]): void;
  addTickers(tickerDataList: ITickerData[]): void;
  updatePrice(ticker: string, price: number, change: number): void;
  updateVolume(ticker: string, volumne: number);
  clearAllTickers(): void;
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

  replaceTickers(tickerDataList: ITickerData[]): void {
    this.clearAllTickers();
    this.addTickers(tickerDataList);
  }

  addTickers(tickerDataList: ITickerData[]): void {
    _.each(tickerDataList, (tickerData: ITickerData) => {
      if (!this.tickerHash[tickerData.ticker]) {
        this.tickerList.push(tickerData.ticker);
        this.tickerHash[tickerData.ticker] = tickerData;
      }
    });
  }

  deleteTickers(tickers: string[]): void {
    _.each(tickers, (ticker: string) => {
      if (this.tickerHash[ticker]) {
        delete this.tickerHash[ticker];
        _.pull(this.tickerList, ticker);
      }
    });
  }

  clearAllTickers(): void {
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