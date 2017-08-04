import {ITickerHash, ITickerDataService} from '../../services/tickerDataService';

import * as html from './ticker-list.html';

export interface ITickerListController {
  getTickerHash(): ITickerHash;
};

class TickerListController implements ITickerListController  {
  constructor(private tickerDataService: ITickerDataService) {
  }

  getTickerHash(): ITickerHash {
    return this.tickerDataService.tickerHash;
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





