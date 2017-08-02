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

export interface ITickerModel {
  addTicker(tickerData: ITickerData): void;
  updatePrice(ticker: string, price: number, change: number): void;
  updateVolume(ticker: string, volumne: number);
  tickerHash:ObservableMap<ITickerData>
}

class TickerDataModel implements ITickerModel {
  public tickerHash:ObservableMap<ITickerData> = observable.map<ITickerData>();

  @action public addTicker(tickerData: ITickerData): void {
    if (!this.tickerHash[tickerData.ticker]) {
      this.tickerHash.set(tickerData.ticker, tickerData);
    }
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

export let tickerDataModel = new TickerDataModel();