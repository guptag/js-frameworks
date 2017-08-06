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

  constructor(
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService) {

    const detachSmaChangeListener = this.$scope.$watch("$ctrl.sma", (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.smaChanged = true;
        this.$timeout(() => {
          this.smaChanged = false;
        }, 100);
      }
    });

    this.$scope.$on('$destroy', () => {
      detachSmaChangeListener();
    });
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





