import * as html from './ticker-count.html';

export interface ITickerCountController {
};

class TickerCountController implements ITickerCountController  {
    constructor() {
    }
}

TickerCountController.$inject = [];

angular.module('perfTest')
        .component('tickerCount', {
          bindings: {
            count: '<'
          },
          template: html,
          controller: TickerCountController
      });





