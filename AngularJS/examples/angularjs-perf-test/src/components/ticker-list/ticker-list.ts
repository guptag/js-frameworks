import {ITickerHash, ITickerDataService, ITickerData} from '../../services/tickerDataService';

import * as html from './ticker-list.html';

export interface ITickerListController {
    getTickerList(): string [];
    getTickerData(ticker): ITickerData;
};

class TickerListController implements ITickerListController  {
  constructor(private tickerDataService: ITickerDataService) {
  }

  getTickerList(): string[] {
      return this.tickerDataService.tickerList;
  }

  getTickerData(ticker): ITickerData {
      return this.tickerDataService.tickerHash[ticker];
  }
}

TickerListController.$inject = ['tickerDataService'];

angular.module('perfTest')
        .component('tickerList', {
          bindings: {
          },
          template: html,
          controller: TickerListController
      });





