import * as html from './control-panel.html';
import {IControlPanelService} from '../../services/controlPanelService';
import {ITickerDataService} from '../../services/tickerDataService';
import {IActionSimulator} from '../../services/actionSimulator';

export interface IControlPanelController {
  startAddingTickers(): void;
  stopAddingTickers(): void;
  startUpdatingTickers(): void;
  stopUpdatingTickers(): void;
  startReplacingTickers(): void;
  stopReplacingTickers(): void;
  startDeletingTickers(): void;
  stopDeletingTickers(): void;
  changeAddTickerInterval(newInterval: number): void;
  changeUpdateTickerInterval(newInterval: number): void;
  changeReplaceTickerInterval(newInterval: number): void;
  changeDeleteTickerInterval(newInterval: number): void;
};

interface ControlPanelScope extends ng.IScope {
  resetStats: ()=> void;
}

class ControlPanelController implements IControlPanelController  {

  constructor(
    private $scope: ControlPanelScope,
    private controlPanelService: IControlPanelService,
    private tickerDataService: ITickerDataService,
    private actionSimulator: IActionSimulator) {
      this.$scope.resetStats = function () {};
  }

  startReplacingTickers() {
    this.$scope.resetStats();
    this.controlPanelService.toggleReplaceTickers(false);
    this.actionSimulator.startReplacingTickers();
  }

  stopReplacingTickers() {
    this.controlPanelService.toggleReplaceTickers(true);
    this.actionSimulator.stopReplacingTickers();
  }

  changeReplaceTickerInterval(newInterval: number) {
    this.controlPanelService.changeReplaceTickerInterval(newInterval);
    this.actionSimulator.resetReplaceTickerInterval();
  }

  startAddingTickers() {
    this.$scope.resetStats();
    this.controlPanelService.toggleAddTickers(false);
    this.actionSimulator.startAddingTickers();
  }

  stopAddingTickers() {
    this.controlPanelService.toggleAddTickers(true);
    this.actionSimulator.stopAddingTickers();
  }

  changeAddTickerInterval(newInterval: number) {
    this.controlPanelService.changeAddTickerInterval(newInterval);
    this.actionSimulator.resetAddTickerInterval();
  }

  startDeletingTickers() {
    this.$scope.resetStats();
    this.controlPanelService.toggleDeleteTickers(false);
    this.actionSimulator.startDeletingTickers();
  }

  stopDeletingTickers() {
    this.controlPanelService.toggleDeleteTickers(true);
    this.actionSimulator.stopDeletingTickers();
  }

  changeDeleteTickerInterval(newInterval: number) {
    this.controlPanelService.changeAddTickerInterval(newInterval);
    this.actionSimulator.resetAddTickerInterval();
  }

  startUpdatingTickers() {
    this.$scope.resetStats();
    this.controlPanelService.toggleUpdateValues(false);
    this.actionSimulator.startUpdatingTickers();
  }

  stopUpdatingTickers() {
    this.controlPanelService.toggleUpdateValues(true);
    this.actionSimulator.stopUpdatingTickers();
  }

  changeUpdateTickerInterval(newInterval: number) {
    this.controlPanelService.changeUpdateTickerInterval(newInterval);
    this.actionSimulator.resetUpdateTickerInterval();
  }
}

ControlPanelController.$inject = ['$scope', 'controlPanelService', 'tickerDataService', 'actionSimulator'];

angular.module('perfTest')
  .directive('controlPanel', function(){
    return {
      restrict: 'E',
      scope: {
      },
      template: html,
      controller: ControlPanelController,
      controllerAs: '$ctrl',
      link: function ($scope: ControlPanelScope, element, attrs) {
        var statsRps = new window["Stats"]();
        statsRps.showPanel(0);

        var statsMs = new window["Stats"]();
        statsMs.showPanel(1);

        var statsMem = new window["Stats"]();
        statsMem.showPanel(2);

        document.getElementById("stats_rps").appendChild(statsRps.dom);
        document.getElementById("stats_ms").appendChild(statsMs.dom);
        document.getElementById("stats_memory").appendChild(statsMem.dom);

        requestAnimationFrame(function loop() {
          statsRps.update();
          statsMs.update();
          statsMem.update();
          document.getElementById("stats_dom_count").innerText = document.getElementsByTagName('*').length.toString();
          requestAnimationFrame(loop)
        });

        $scope.resetStats = function () {
          statsRps.reset();
          statsMs.reset();
          statsMem.reset();
        }
      }
    };
});





