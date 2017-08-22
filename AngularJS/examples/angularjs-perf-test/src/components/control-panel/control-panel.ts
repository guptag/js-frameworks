import * as html from './control-panel.html';
import {IControlPanelService} from '../../services/controlPanelService';
import {ITickerDataService} from '../../services/tickerDataService';
import {IActionSimulator} from '../../services/actionSimulator';
import { ControlPanelActionType, ControlPanelDefaults, ActionDefaults } from "../../config/config";

export interface IControlPanelController {
  onStartAction(actionType: ControlPanelActionType);
  onStopAction(actionType: ControlPanelActionType);
  onChangeInterval(actionType: ControlPanelActionType, increment: boolean);
};

interface ControlPanelScope extends ng.IScope {
  resetStats: ()=> void;
}

class ControlPanelController implements IControlPanelController  {
  public controlPanelActionType = ControlPanelActionType;
  
  constructor(
    private $scope: ControlPanelScope,
    private controlPanelService: IControlPanelService,
    private tickerDataService: ITickerDataService,
    private actionSimulator: IActionSimulator) {
      this.$scope.resetStats = function () {};
  }

  onStartAction(actionType: ControlPanelActionType) {
    this.$scope.resetStats();
    this.controlPanelService.toggleAction(actionType, false);
    this.actionSimulator.startAction(actionType);
  }

  onStopAction(actionType: ControlPanelActionType) {
    this.controlPanelService.toggleAction(actionType, true);
    this.actionSimulator.stopAction(actionType);
  }

  onChangeInterval(actionType: ControlPanelActionType, increment: boolean) {
    this.controlPanelService.changeActionInterval(actionType, increment);
    this.actionSimulator.resetInterval(actionType);
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
        var statsFps = new window["Stats"](0);
        statsFps.showPanel();

        var statsMs = new window["Stats"](1);
        statsMs.showPanel();

        var statsMem = new window["Stats"](2);
        statsMem.showPanel();

        document.getElementById("stats_rps").appendChild(statsFps.dom);
        document.getElementById("stats_ms").appendChild(statsMs.dom);
        document.getElementById("stats_memory").appendChild(statsMem.dom);

        requestAnimationFrame(function loop() {
          statsFps.update();
          statsMs.update();
          statsMem.update();
          document.getElementById("stats_dom_count").innerText = document.getElementsByTagName('*').length.toString();
          requestAnimationFrame(loop)
        });

        $scope.resetStats = function () {
          statsFps.reset();
          statsMs.reset();
          statsMem.reset();
        }
      }
    };
});





