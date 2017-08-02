import {observable, action} from 'mobx';

export interface IConrolPanelOptions {
  addTickersEnabled: boolean;
  addTickerFrequency: number;
  updateValuesEnabled: boolean;
  updateValuesFrequency: number;
}

export interface IControlPanelModel {
  toggleAddTickersEnabled(): void;
  toggleUpdateValuesEnabled(): void;
  changeAddTickerFrequency(frequency: number): void;
  changeUpdateTickerFrequency(frequency: number): void;
  options:IConrolPanelOptions;
}

class ControlPanelModel implements IControlPanelModel {
  @observable public options:IConrolPanelOptions = {
    addTickersEnabled: true,
    addTickerFrequency: 25,
    updateValuesEnabled: true,
    updateValuesFrequency: 25
  };

  @action public toggleAddTickersEnabled(): void {
   this.options.addTickersEnabled = !this.options.addTickersEnabled;
  }

  @action public toggleUpdateValuesEnabled(): void {
    this.options.updateValuesEnabled = !this.options.updateValuesEnabled;
  }

  @action public changeAddTickerFrequency(frequency: number): void {
    if (frequency < 10) { frequency = 10;}
    if (frequency > 300) { frequency = 300;}
    this.options.addTickerFrequency = frequency;
  }

  @action public changeUpdateTickerFrequency(frequency: number): void {
    if (frequency < 10) { frequency = 10;}
    if (frequency > 300) { frequency = 300;}
    this.options.updateValuesFrequency = frequency;
  }
}

export let controlPanelModel = new ControlPanelModel();