import * as html from './sma.html';

export interface ISmaController {
  smaChanged: boolean;
  label: string;
  value: number;
};

class SmaController implements ISmaController  {
  smaChanged: boolean;
  label: string;
  value: number;

  constructor() {
  }
}

SmaController.$inject = ['$scope', '$timeout'];

angular.module('perfTest')
        .component('sma', {
          bindings: {
            label: '@',
            value: '<'
          },
          template: html,
          controller: SmaController
      });





