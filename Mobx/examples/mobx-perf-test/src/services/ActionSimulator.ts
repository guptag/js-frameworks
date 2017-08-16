declare function require(name:string);
var Perf = require('react-addons-perf');

import { tickerDataModel } from '../models/TickerDataModel';
import { controlPanelModel} from '../models/ControlPanelModel';
import { ControlPanelActionType, ControlPanelDefaults, ActionDefaults } from "../config/config";
import { ServerDataManager, IServerDataManager} from './serverDataManager';
import { ISimulatedAction, ReplaceTickerAction, AddTickerAction, UpdateTickerAction, DeleteTickerAction } from './simulatedActions';

declare function require(name:string);
var Perf = require('react-addons-perf');

class ActionSimulator {
  private measuringPerf: boolean;
  private serverDataManager: IServerDataManager;
  private actionMapper: {[actionType: number]: ISimulatedAction} = {};

  constructor() {
    this.serverDataManager = new ServerDataManager();
    this.actionMapper[ControlPanelActionType.Replace] = new ReplaceTickerAction(controlPanelModel, tickerDataModel, this.serverDataManager, () => this.resetAddAction());
    this.actionMapper[ControlPanelActionType.Add] = new AddTickerAction(controlPanelModel, tickerDataModel, this.serverDataManager, () => this.resetReplaceAction());
    this.actionMapper[ControlPanelActionType.Delete] = new DeleteTickerAction(controlPanelModel, tickerDataModel);
    this.actionMapper[ControlPanelActionType.Update] = new UpdateTickerAction(controlPanelModel, tickerDataModel);
  }

  resetReplaceAction() {
    this.actionMapper[ControlPanelActionType.Replace].clearAction();
    controlPanelModel.toggleAction(ControlPanelActionType.Replace, true);
  }

  resetAddAction() {
    this.actionMapper[ControlPanelActionType.Add].clearAction();
    controlPanelModel.toggleAction(ControlPanelActionType.Add, true);
  }


  startAction(actionType: ControlPanelActionType) {
    this.startPerf();
    this.actionMapper[actionType].scheduleAction();
  }

  stopAction(actionType: ControlPanelActionType) {
    this.endPerf();
    this.actionMapper[actionType].clearAction();
  }

  resetInterval(actionType: ControlPanelActionType) {
    this.actionMapper[actionType].resetAction();
  }

  startPerf() {
    // enable for debugging; will impact perf/memory numbers

    /*if (!this.measuringPerf) {
      this.measuringPerf = true;
      Perf.start();
   }*/
  }

  endPerf() {
    /*this.measuringPerf = false;

    Perf.stop();

    console.log("Inclusive");
    Perf.printInclusive();

    console.log("Exclusive");
    Perf.printExclusive();

    console.log("Wasted");
    Perf.printWasted();*/

    //console.log("Dom Operations");
    //Perf.printOperations();
  }
}

export default new ActionSimulator();