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
  toggleAddTickers(enable: boolean): void;
  toggleUpdateValues(enable: boolean): void;
  toggleReplaceValues(enable: boolean): void;
  toggleDeleteValues(enable: boolean): void;
  changeAddTickersInterval(interval: number): void;
  changeReplaceTickersInterval(interval: number): void;
  changeDeleteTickersInterval(interval: number): void;
  changeUpdateTickerInterval(interval: number): void;
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

  @action public toggleAddTickers(enable: boolean): void {
   this.options.addTickersEnabled = enable;
  }

  @action public toggleUpdateValues(enable: boolean): void {
    this.options.updateValuesEnabled = enable;
  }

  @action public toggleReplaceValues(enable: boolean): void {
    this.options.replaceTickersEnabled = enable;
  }

  @action public toggleDeleteValues(enable: boolean): void {
    this.options.deleteTickersEnabled = enable;
  }

  @action public changeAddTickersInterval(interval: number): void {
    if (interval < 20) { interval = 20;}
    this.options.addTickerIntervalMSec = interval;
  }

  @action public changeUpdateTickerInterval(interval: number): void {
    if (interval < 10) { interval = 10;}
    this.options.updateValuesIntervalMSec = interval;
  }

  @action public changeReplaceTickersInterval(interval: number): void {
    if (interval < 20) { interval = 20;}
    this.options.addTickerIntervalMSec = interval;
  }

  @action public changeDeleteTickersInterval(interval: number): void {
    if (interval < 20) { interval = 20;}
    this.options.addTickerIntervalMSec = interval;
  }
}

export let controlPanelModel = new ControlPanelViewModel();