import {ITickerData} from '../../services/tickerDataService';

import * as html from './ticker-tile.html';

export interface ITickerTileController {
  tickerData: ITickerData;
};

class TickerTileController implements ITickerTileController  {
  tickerData: ITickerData;

  constructor() {
  }
}

TickerTileController.$inject = [];

angular.module('perfTest')
        .component('tickerTile', {
          bindings: {
            tickerData: '<'
          },
          template: html,
          controller: TickerTileController
      });





