import * as _ from 'lodash';
import { IControlPanelService } from './controlPanelService';
import { ITickerDataService } from './tickerDataService';
import { IServerDataManager} from './serverDataManager';
import { ControlPanelActionType, ControlPanelDefaults, ActionDefaults } from "../config/config";
import { ISimulatedAction, ReplaceTickerAction, AddTickerAction, UpdateTickerAction, DeleteTickerAction } from './simulatedActions';



export interface IActionSimulator {
  startAction(actionType: ControlPanelActionType);
  stopAction(actionType: ControlPanelActionType);
  resetInterval(actionType: ControlPanelActionType);
}

class ActionSimulator implements IActionSimulator {
  private actionMapper: {[actionType: number]: ISimulatedAction} = {};

  constructor(
    private serverDataManager: IServerDataManager,
    private controlPanelService: IControlPanelService,
    private tickerDataService: ITickerDataService,
    private $interval: ng.IIntervalService
  ) {
    this.actionMapper[ControlPanelActionType.Replace] = new ReplaceTickerAction(
      $interval,
      controlPanelService, 
      tickerDataService, 
      this.serverDataManager, () => { 
        this.resetAddAction(); 
        this.resetDeleteAction(); 
      });

    this.actionMapper[ControlPanelActionType.Add] = new AddTickerAction(
      $interval,
      controlPanelService, 
      tickerDataService, 
      this.serverDataManager, () => {
        this.resetReplaceAction();
        this.resetDeleteAction(); 
      });

    this.actionMapper[ControlPanelActionType.Delete] = new DeleteTickerAction(
      $interval,
      controlPanelService, 
      tickerDataService, 
      () => {
        this.resetReplaceAction();
        this.resetAddAction(); 
      });

    this.actionMapper[ControlPanelActionType.Update] = new UpdateTickerAction(
      $interval,
      controlPanelService, 
      tickerDataService);
  }

  resetReplaceAction() {
    this.actionMapper[ControlPanelActionType.Replace].clearAction();
    this.controlPanelService.toggleAction(ControlPanelActionType.Replace, true);
  }

  resetAddAction() {
    this.actionMapper[ControlPanelActionType.Add].clearAction();
    this.controlPanelService.toggleAction(ControlPanelActionType.Add, true);
  }

  resetDeleteAction() {
    this.actionMapper[ControlPanelActionType.Delete].clearAction();
    this.controlPanelService.toggleAction(ControlPanelActionType.Delete, true);
  }


  startAction(actionType: ControlPanelActionType) {
    this.actionMapper[actionType].scheduleAction();
  }

  stopAction(actionType: ControlPanelActionType) {
    this.actionMapper[actionType].clearAction();
  }

  resetInterval(actionType: ControlPanelActionType) {
    this.actionMapper[actionType].resetAction();
  }
}

angular.module('perfTest')
      .service('actionSimulator', ActionSimulator);