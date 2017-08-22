import { ControlPanelActionType, ControlPanelDefaults, ActionDefaults } from "../config/config";

export interface IConrolPanelOptions {
  addTickersEnabled: boolean;
  addTickerIntervalMSec: number;
  updateValuesEnabled: boolean;
  updateValuesIntervalMSec: number;
  deleteTickersEnabled: boolean;
  deleteTickerIntervalMSec: number;
  replaceTickersEnabled: boolean;
  replaceTickerIntervalMSec: number;
}

export interface IControlPanelService {
  toggleAction(actionType: ControlPanelActionType, enable: boolean);
  changeActionInterval(actionType: ControlPanelActionType, increment: boolean);
  options:IConrolPanelOptions;
}

class ControlPanelService implements IControlPanelService {
  public options:IConrolPanelOptions = {
    replaceTickersEnabled: true,
    replaceTickerIntervalMSec: ControlPanelDefaults.ReplaceTickerIntervalMSec,
    addTickersEnabled: true,
    addTickerIntervalMSec: ControlPanelDefaults.AddTickerIntervalMSec,
    deleteTickersEnabled: true,
    deleteTickerIntervalMSec: ControlPanelDefaults.DeleteTickerIntervalMSec,
    updateValuesEnabled: true,
    updateValuesIntervalMSec: ControlPanelDefaults.UpdateValuesIntervalMSec
  };

  constructor() {

  }

  public toggleAction(actionType: ControlPanelActionType, enable: boolean) {
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

  public  changeActionInterval(actionType: ControlPanelActionType, increment: boolean) {
    let interval: number;
    switch (actionType) {
      case ControlPanelActionType.Add:
        interval = this.options.addTickerIntervalMSec + (increment ? 1 : -1) * ControlPanelDefaults.AddIncrementMsec;
        if (interval < ControlPanelDefaults.AddMinIntervalMsec ) { interval = ControlPanelDefaults.AddMinIntervalMsec;}
        this.options.addTickerIntervalMSec = interval;
        break;
      case ControlPanelActionType.Delete:
        interval = this.options.deleteTickerIntervalMSec + (increment ? 1 : -1) * ControlPanelDefaults.DeleteIncrementMsec;
        if (interval < ControlPanelDefaults.DeleteMinIntervalMsec) { interval = ControlPanelDefaults.DeleteMinIntervalMsec;}
        this.options.deleteTickerIntervalMSec = interval;
        break;
      case ControlPanelActionType.Replace:
         interval = this.options.replaceTickerIntervalMSec + (increment ? 1 : -1) * ControlPanelDefaults.ReplaceIncrementMsec;
         if (interval < ControlPanelDefaults.ReplaceMinIntervalMsec ) {interval = ControlPanelDefaults.ReplaceMinIntervalMsec;}
        this.options.replaceTickerIntervalMSec = interval;
        break;
      case ControlPanelActionType.Update:
        interval = this.options.updateValuesIntervalMSec + (increment ? 1 : -1) * ControlPanelDefaults.UpdateIncrementMsec;
        if (interval < ControlPanelDefaults.UpdateMinIntervalMsec) { interval = ControlPanelDefaults.UpdateMinIntervalMsec;}
        this.options.updateValuesIntervalMSec = interval;
        break;
    }
  }
}

angular.module('perfTest')
      .service('controlPanelService', ControlPanelService);