import * as _ from "lodash";
import {observable, action, ObservableMap, computed, IObservableArray} from 'mobx';

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

export type ITickerList = string[];
export type ITickerHash = Map<string, ITickerData>;

export interface ITickerDataViewModel {
  addTickers(tickerDataList: ITickerData[]): void;
  replaceTickers(tickerDataList: ITickerData[]): void;
  deleteTickers(tickers: string[]): void;
  clearAllTickers(): void;
  updatePrice(ticker: string, price: number, change: number): void;
  updateVolume(ticker: string, volumne: number);
  tickerHash:ObservableMap<ITickerData>,
  tickerList: IObservableArray<string>;
}

class TickerDataViewModel implements ITickerDataViewModel {
  public tickerHash:ObservableMap<ITickerData> = observable.map<ITickerData>();
  public tickerList: IObservableArray<string> = observable([]);

  public getAllTickers(): IObservableArray<string> {
    return this.tickerList;
  }

  @action public addTickers(tickerDataList: ITickerData[]): void {
    _.each(tickerDataList, (tickerData: ITickerData) => {
      if (!this.tickerHash.get(tickerData.ticker)) {
        this.tickerList.push(tickerData.ticker);
        this.tickerHash.set(tickerData.ticker, tickerData);
      }
    });
  }

  @action public clearAllTickers(): void {
    this.tickerHash.clear();
    this.tickerList.clear();
  }

  @action public replaceTickers(tickerDataList: ITickerData[]): void {
    this.tickerHash.clear();
    this.tickerList.clear();
    _.each(tickerDataList, (tickerData: ITickerData) => {
      if (!this.tickerHash.get(tickerData.ticker)) {
        this.tickerHash.set(tickerData.ticker, tickerData);
        this.tickerList.push(tickerData.ticker);
      }
    });
  }

  @action public deleteTickers(tickers: string[]): void {
    _.each(tickers, (ticker: string) => {
      if (this.tickerHash.get(ticker)) {
        this.tickerHash.delete(ticker);
        this.tickerList.remove(ticker);
      }
    });
  }

  @action public updatePrice(ticker: string, price: number, change: number): void {
    let tickerData: ITickerData = this.tickerHash.get(ticker);
    if (tickerData) {
      Object.assign(tickerData, {
        price: price,
        change: change
      });
    }
  }

  @action public updateVolume(ticker: string, volume: number): void {
    let tickerData: ITickerData = this.tickerHash.get(ticker);
    if (tickerData) {
      Object.assign(tickerData, {
        volume: volume
      });
    }
  }
}

export let tickerDataModel = new TickerDataViewModel();