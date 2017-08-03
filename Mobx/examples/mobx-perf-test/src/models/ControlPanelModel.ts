import {observable, action} from 'mobx';

export interface IConrolPanelOptions {
  addTickersEnabled: boolean;
  addTickerIntervalMSec: number;
  updateValuesEnabled: boolean;
  updateValueIntervalMSec: number;
}

export interface IControlPanelModel {
  toggleAddTickers(enable: boolean): void;
  toggleUpdateValues(enable: boolean): void;
  changeAddTickerInterval(interval: number): void;
  changeUpdateTickerInterval(interval: number): void;
  options:IConrolPanelOptions;
}

class ControlPanelModel implements IControlPanelModel {
  @observable public options:IConrolPanelOptions = {
    addTickersEnabled: true,
    addTickerIntervalMSec: 40,
    updateValuesEnabled: true,
    updateValueIntervalMSec: 20
  };

  @action public toggleAddTickers(enable: boolean): void {
   this.options.addTickersEnabled = enable;
  }

  @action public toggleUpdateValues(enable: boolean): void {
    this.options.updateValuesEnabled = enable;
  }

  @action public changeAddTickerInterval(interval: number): void {
    if (interval < 20) { interval = 20;}
    this.options.addTickerIntervalMSec = interval;
  }

  @action public changeUpdateTickerInterval(interval: number): void {
    if (interval < 10) { interval = 10;}
    this.options.updateValueIntervalMSec = interval;
  }
}

export let controlPanelModel = new ControlPanelModel();