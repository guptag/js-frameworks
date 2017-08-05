export interface IConrolPanelOptions {
  addTickersEnabled: boolean;
  addTickerIntervalMSec: number;
  updateValuesEnabled: boolean;
  updateValueIntervalMSec: number;
}

export interface IControlPanelService {
  toggleAddTickers(enable: boolean): void;
  toggleUpdateValues(enable: boolean): void;
  changeAddTickerInterval(interval: number): void;
  changeUpdateTickerInterval(interval: number): void;
  options:IConrolPanelOptions;
}

class ControlPanelService implements IControlPanelService {
  public options:IConrolPanelOptions = {
    addTickersEnabled: true,
    addTickerIntervalMSec: 10,
    updateValuesEnabled: true,
    updateValueIntervalMSec: 10
  };

  constructor() {

  }

  toggleAddTickers(enable: boolean): void {
   this.options.addTickersEnabled = enable;
  }

  toggleUpdateValues(enable: boolean): void {
    this.options.updateValuesEnabled = enable;
  }

  changeAddTickerInterval(interval: number): void {
    if (interval < 5) { interval = 5;}
    this.options.addTickerIntervalMSec = interval;
  }

  public changeUpdateTickerInterval(interval: number): void {
    if (interval < 5) { interval = 5;}
    this.options.updateValueIntervalMSec = interval;
  }
}

angular.module('perfTest')
      .service('controlPanelService', ControlPanelService);