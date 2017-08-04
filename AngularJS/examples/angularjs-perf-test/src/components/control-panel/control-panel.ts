import * as html from './control-panel.html';
import {IControlPanelService} from '../../services/controlPanelService';
import {ITickerDataService} from '../../services/tickerDataService';
import {IActionSimulator} from '../../services/actionSimulator';

export interface IControlPanelController {
  startAddingTickers(): void;
  stopAddingTickers(): void;
  startUpdatingTickers(): void;
  stopUpdatingTickers(): void;
};

class ControlPanelController implements IControlPanelController  {

  constructor(
    private controlPanelService: IControlPanelService,
    private tickerDataService: ITickerDataService,
    private actionSimulator: IActionSimulator) {
  }

  startAddingTickers() {
    this.controlPanelService.toggleAddTickers(false);
    this.actionSimulator.startAddingTickers();
  }

  stopAddingTickers() {
    this.controlPanelService.toggleAddTickers(true);
    this.actionSimulator.stopAddingTickers();
  }

  startUpdatingTickers() {
    this.controlPanelService.toggleUpdateValues(false);
    this.actionSimulator.startUpdatingTickers();
  }

  stopUpdatingTickers() {
    this.controlPanelService.toggleUpdateValues(true);
    this.actionSimulator.stopUpdatingTickers();
  }
}

ControlPanelController.$inject = ['controlPanelService', 'tickerDataService', 'actionSimulator'];

angular.module('perfTest')
  .directive('controlPanel', function(){
    return {
      restrict: 'E',
      scope: {
      },
      template: html,
      controller: ControlPanelController,
      controllerAs: '$ctrl',
      link: function ($scope, element, attrs) {
        var statsRps = new window["Stats"]();
        statsRps.showPanel(0);

        var statsMs = new window["Stats"]();
        statsMs.showPanel(1);

        document.getElementById("stats_rps").appendChild(statsRps.dom);
        document.getElementById("stats_ms").appendChild(statsMs.dom);
        requestAnimationFrame(function loop() {
          statsRps.update();
          statsMs.update();
          document.getElementById("stats_dom_count").innerText = document.getElementsByTagName('*').length.toString();
          requestAnimationFrame(loop)
        });
      }
    };
});





