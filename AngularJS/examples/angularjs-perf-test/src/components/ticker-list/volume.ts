import * as html from './volume.html';

export interface IVolumeController {
  volumeChanged: boolean;
  volume: number;
};

class VolumeController implements IVolumeController  {
  volumeChanged: boolean;
  volume: number;

  constructor(private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService) {

    const detachPriceChangeListener = this.$scope.$watch("$ctrl.volume", (newValue, oldValue) => {
        if (newValue !== oldValue) {
          this.volumeChanged = true;
          this.$timeout(() => {
            this.volumeChanged = false;
          }, 100);
        }
    });

    this.$scope.$on('$destroy', () => {
        detachPriceChangeListener();
    });
  }
}

VolumeController.$inject = ['$scope', '$timeout'];

angular.module('perfTest')
        .component('volume', {
          bindings: {
            volume: '<'
          },
          template: html,
          controller: VolumeController
      });





