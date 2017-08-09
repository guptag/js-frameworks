import {observable, action} from 'mobx';
import { ControlPanelActionType, ControlPanelDefaults, ActionDefaults } from "../config/config";

export interface IConrolPanelOptions {
  addTickersEnabled: boolean;
  updateValuesEnabled: boolean;
  replaceTickersEnabled: boolean;
  deleteTickersEnabled: boolean;
  addTickerIntervalMSec: number;
  updateValuesIntervalMSec: number;
  replaceTickerIntervalMSec: number;
  deleteTickerIntervalMSec: number;
}

export interface IControlPanelViewModel {
  toggleAction(actionType: ControlPanelActionType, enable: boolean);
  changeActionInterval(actionType: ControlPanelActionType, increment: boolean);
  options:IConrolPanelOptions;
}

class ControlPanelViewModel implements IControlPanelViewModel {
  @observable public options:IConrolPanelOptions = {
    replaceTickersEnabled: true,
    replaceTickerIntervalMSec: ControlPanelDefaults.ReplaceTickerIntervalMSec,
    addTickersEnabled: true,
    addTickerIntervalMSec: ControlPanelDefaults.AddTickerIntervalMSec,
    deleteTickersEnabled: true,
    deleteTickerIntervalMSec: ControlPanelDefaults.DeleteTickerIntervalMSec,
    updateValuesEnabled: true,
    updateValuesIntervalMSec: ControlPanelDefaults.UpdateValuesIntervalMSec
  };

  @action public toggleAction(actionType: ControlPanelActionType, enable: boolean) {
    switch (actionType) {
      case ControlPanelActionType.Add:
        this.options.addTickersEnabled = enable;
        break;
      case ControlPanelActionType.Delete:
        this.options.deleteTickersEnabled = enable;
        break;
      case ControlPanelActionType.Replace:
        this.options.replaceTickersEnabled = enable;
        break;
      case ControlPanelActionType.Update:
        this.options.updateValuesEnabled = enable;
        break;
    }
  }

  @action public  changeActionInterval(actionType: ControlPanelActionType, increment: boolean) {
    let interval: number;
    switch (actionType) {
      case ControlPanelActionType.Add:
        interval = controlPanelModel.options.addTickerIntervalMSec + (increment ? 1 : -1) * ControlPanelDefaults.AddIncrementMsec;
        if (interval < ControlPanelDefaults.AddMinIntervalMsec ) { interval = ControlPanelDefaults.AddMinIntervalMsec;}
        this.options.addTickerIntervalMSec = interval;
        break;
      case ControlPanelActionType.Delete:
        interval = controlPanelModel.options.deleteTickerIntervalMSec + (increment ? 1 : -1) * ControlPanelDefaults.DeleteIncrementMsec;
        if (interval < ControlPanelDefaults.DeleteMinIntervalMsec) { interval = ControlPanelDefaults.DeleteMinIntervalMsec;}
        this.options.deleteTickerIntervalMSec = interval;
        break;
      case ControlPanelActionType.Replace:
         interval = controlPanelModel.options.replaceTickerIntervalMSec + (increment ? 1 : -1) * ControlPanelDefaults.ReplaceIncrementMsec;
         if (interval < ControlPanelDefaults.ReplaceMinIntervalMsec ) {interval = ControlPanelDefaults.ReplaceMinIntervalMsec;}
        this.options.replaceTickerIntervalMSec = interval;
        break;
      case ControlPanelActionType.Update:
        interval = controlPanelModel.options.updateValuesIntervalMSec + (increment ? 1 : -1) * ControlPanelDefaults.UpdateIncrementMsec;
        if (interval < ControlPanelDefaults.UpdateMinIntervalMsec) { interval = ControlPanelDefaults.UpdateMinIntervalMsec;}
        this.options.updateValuesIntervalMSec = interval;
        break;
    }
  }
}

export let controlPanelModel = new ControlPanelViewModel();

