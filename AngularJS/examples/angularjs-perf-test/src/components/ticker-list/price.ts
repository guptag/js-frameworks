import * as html from './price.html';

export interface IPriceController {
  priceChanged: boolean;
  price: number;
  volue: number;
};

class PriceController implements IPriceController  {
  priceChanged: boolean;
  price: number;
  volue: number;

  constructor(
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService) {

    const detachPriceChangeListener = this.$scope.$watch("$ctrl.price", (newValue, oldValue) => {
        if (newValue !== oldValue) {
          this.priceChanged = true;
          this.$timeout(() => {
            this.priceChanged = false;
          }, 100);
        }
    });

    this.$scope.$on('$destroy', () => {
        detachPriceChangeListener();
    });
  }
}

PriceController.$inject = ['$scope', '$timeout'];

angular.module('perfTest')
        .component('price', {
          bindings: {
            price: '<',
            change: '<'
          },
          template: html,
          controller: PriceController
      });





