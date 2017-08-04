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
    addTickerIntervalMSec: 40,
    updateValuesEnabled: true,
    updateValueIntervalMSec: 20
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
    if (interval < 20) { interval = 20;}
    this.options.addTickerIntervalMSec = interval;
  }

  public changeUpdateTickerInterval(interval: number): void {
    if (interval < 10) { interval = 10;}
    this.options.updateValueIntervalMSec = interval;
  }
}

angular.module('perfTest')
      .service('controlPanelService', ControlPanelService);