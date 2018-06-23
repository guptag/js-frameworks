import * as _ from 'lodash';
import { ITickerData, ITickerList } from './tickerDataService';
import { ControlPanelActionType, ControlPanelDefaults, ActionDefaults } from "../config/config";

export interface IServerDataManager {
  resetIndex(): void;
  hasReachedEnd(): boolean;
  getNewTickers(count: number): ITickerData[];
}

export class ServerDataManager {
  private newTickerIndexToAdd: number = -1;
  private tickerDataFromServer;

  constructor() {
    this.tickerDataFromServer = (<any>window).tickerData || [];
  }

  resetIndex(): void {
    this.newTickerIndexToAdd = -1;
  }

  hasReachedEnd() : boolean {
    return this.newTickerIndexToAdd >= this.tickerDataFromServer.length - 1;
  }

  getNewTickers(count: number): ITickerData[] {
    const newTickers: ITickerData[] = [];

    _.times(count, () => {
      if (!this.hasReachedEnd()) {
        this.newTickerIndexToAdd++;
        const tickerItem = this.tickerDataFromServer[this.newTickerIndexToAdd];

        newTickers.push({
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

    return newTickers;
  }
}

angular.module('perfTest')
  .service('serverDataManager', ServerDataManager);