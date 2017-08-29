import * as _ from 'lodash';
import { IAppState } from '../redux-core/reducers/appReducer';
import appStore  from '../redux-core/store/appStore';
import { ControlPanelActionType, ControlPanelDefaults, ActionDefaults } from "../redux-core/config/config";
import { actions } from '../redux-core/actions/actions';
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
    this.actionMapper[ControlPanelActionType.Replace] = new ReplaceTickerAction(
      appStore, 
      this.serverDataManager, 
      () => { 
        this.resetAddAction(); 
        this.resetDeleteAction() 
      });
    
    this.actionMapper[ControlPanelActionType.Add] = new AddTickerAction(
      appStore, 
      this.serverDataManager, 
      () => { 
        this.resetReplaceAction(); 
        this.resetDeleteAction(); 
      });

    this.actionMapper[ControlPanelActionType.Delete] = new DeleteTickerAction(appStore, () => { 
      this.resetAddAction(); 
      this.resetReplaceAction() 
    });
    
    this.actionMapper[ControlPanelActionType.Update] = new UpdateTickerAction(appStore);
  }

  resetReplaceAction() {
    this.actionMapper[ControlPanelActionType.Replace].clearAction();
    appStore.dispatch(actions.controlPanel.createToggleAction(ControlPanelActionType.Replace, true));
  }

  resetAddAction() {
    this.actionMapper[ControlPanelActionType.Add].clearAction();
    appStore.dispatch(actions.controlPanel.createToggleAction(ControlPanelActionType.Add, true));
  }

  resetDeleteAction() {
    this.actionMapper[ControlPanelActionType.Delete].clearAction();
    appStore.dispatch(actions.controlPanel.createToggleAction(ControlPanelActionType.Delete, true));
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