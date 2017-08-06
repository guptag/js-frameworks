export interface IConrolPanelOptions {
  addTickersEnabled: boolean;
  addTickerIntervalMSec: number;
  updateValuesEnabled: boolean;
  updateValueIntervalMSec: number;
  deleteTickersEnabled: boolean;
  deleteTickerIntervalMSec: number;
  replaceTickersEnabled: boolean;
  replaceTickerIntervalMSec: number;
}

export interface IControlPanelService {
  toggleAddTickers(enable: boolean): void;
  toggleUpdateValues(enable: boolean): void;
  toggleDeleteTickers(enable: boolean): void;
  toggleReplaceTickers(enable: boolean): void;
  changeAddTickerInterval(interval: number): void;
  changeUpdateTickerInterval(interval: number): void;
  changeDeleteTickerInterval(interval: number): void;
  changeReplaceTickerInterval(interval: number): void;
  options:IConrolPanelOptions;
}

class ControlPanelService implements IControlPanelService {
  public options:IConrolPanelOptions = {
    addTickersEnabled: true,
    addTickerIntervalMSec: 100,
    updateValuesEnabled: true,
    updateValueIntervalMSec: 10,
    deleteTickersEnabled: true,
    deleteTickerIntervalMSec: 100,
    replaceTickersEnabled: true,
    replaceTickerIntervalMSec: 500
  };

  constructor() {

  }

  toggleAddTickers(enable: boolean): void {
   this.options.addTickersEnabled = enable;
  }

  toggleUpdateValues(enable: boolean): void {
    this.options.updateValuesEnabled = enable;
  }

  toggleDeleteTickers(enable: boolean): void {
    this.options.deleteTickersEnabled = enable;
  }

  toggleReplaceTickers(enable: boolean): void {
    this.options.replaceTickersEnabled = enable;
  }

  changeAddTickerInterval(interval: number): void {
    if (interval < 50) { interval = 50;}
    this.options.addTickerIntervalMSec = interval;
  }

  public changeUpdateTickerInterval(interval: number): void {
    if (interval < 5) { interval = 5;}
    this.options.updateValueIntervalMSec = interval;
  }

  public changeDeleteTickerInterval(interval: number): void {
    if (interval < 20) { interval = 20;}
    this.options.deleteTickerIntervalMSec = interval;
  }

  public changeReplaceTickerInterval(interval: number): void {
    if (interval < 50) { interval = 50;}
    this.options.replaceTickerIntervalMSec = interval;
  }
}

angular.module('perfTest')
      .service('controlPanelService', ControlPanelService);