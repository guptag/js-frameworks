import * as _ from "lodash";
import {observable, action, ObservableMap, computed} from 'mobx';

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

export type ITickerHash = Map<string, ITickerData>;

export interface ITickerDataViewModel {
  addTickers(tickerDataList: ITickerData[]): void;
  replaceTickers(tickerDataList: ITickerData[]): void;
  deleteTickers(tickerDataList: ITickerData[]): void;
  clearAllTickers(): void;
  updatePrice(ticker: string, price: number, change: number): void;
  updateVolume(ticker: string, volumne: number);
  tickerHash:ObservableMap<ITickerData>
}

class TickerDataViewModel implements ITickerDataViewModel {
  public tickerHash:ObservableMap<ITickerData> = observable.map<ITickerData>();

  @action public addTickers(tickerDataList: ITickerData[]): void {
    _.each(tickerDataList, (tickerData: ITickerData) => {
      if (!this.tickerHash[tickerData.ticker]) {
        this.tickerHash.set(tickerData.ticker, tickerData);
      }
    });
  }

  @action public clearAllTickers(): void {
    this.tickerHash.clear();
  }

  @action public replaceTickers(tickerDataList: ITickerData[]): void {
    this.tickerHash.clear();
    _.each(tickerDataList, (tickerData: ITickerData) => {
      if (!this.tickerHash[tickerData.ticker]) {
        this.tickerHash.set(tickerData.ticker, tickerData);
      }
    });
  }

  @action public deleteTickers(tickerDataList: ITickerData[]): void {
    _.each(tickerDataList, (tickerData: ITickerData) => {
      if (this.tickerHash[tickerData.ticker]) {
        this.tickerHash.delete(tickerData.ticker);
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