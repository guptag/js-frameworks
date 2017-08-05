import * as React from 'react';
import {observer} from 'mobx-react';

import { ITickerModel } from '../../models/TickerDataModel';
import { IControlPanelModel, IConrolPanelOptions} from '../../models/ControlPanelModel';
import ActionSimulator from '../../services/actionSimulator';
import TickerCount from './TickerCount';

interface IControlPanelProps {
  controlPanelModel: IControlPanelModel;
  tickerDataModel: ITickerModel;
}

@observer
class ControlPanel extends React.Component<IControlPanelProps, null> {
  componentDidMount() {
    var statsRps = new window["Stats"]();
    statsRps.showPanel(0);

    var statsMs = new window["Stats"]();
    statsMs.showPanel(1);

    document.getElementById("stats_rps").appendChild(statsRps.dom);
    document.getElementById("stats_ms").appendChild(statsMs.dom);
    requestAnimationFrame(function loop() {
      statsRps.update();
      statsMs.update();
      document.getElementById("stats_dom_count").innerText = document.getElementsByTagName('*').length.toString();
      requestAnimationFrame(loop)
    });
  }

  onAddTickers() {
    this.props.controlPanelModel.toggleAddTickers(false);
    ActionSimulator.startAddingTickers();
  }

  onStopAddTickers() {
    this.props.controlPanelModel.toggleAddTickers(true);
    ActionSimulator.stopAddingTickers();
  }

  onUpdateTickers() {
    this.props.controlPanelModel.toggleUpdateValues(false);
    ActionSimulator.startUpdatingTickers();
  }

  onStopUpdateTickers() {
    this.props.controlPanelModel.toggleUpdateValues(true);
    ActionSimulator.stopUpdatingTickers();
  }

  onChangeAddTickerFrequency(frequency: number) {
    this.props.controlPanelModel.changeAddTickerInterval(frequency);
  }

  onChangeUpdateTickerFrequency(frequency: number) {
    this.props.controlPanelModel.changeUpdateTickerInterval(frequency);
  }

  render() {
    return (
      <section className="control-panel">
          <h1>Mobx Perf Test</h1>
          <section className="stats clearfix">
            <div id="stats_rps" className="rps"></div>
            <div id="stats_ms" className="ms"></div>
          </section>
          <section className="counts clearfix">
            <div className="dom">
              <h6>DOM Count</h6>
              <div id="stats_dom_count"></div>
            </div>
            <div className="tickers">
              <h6>Tickers</h6>
              <div id="stats_ticker_count"><TickerCount count={this.props.tickerDataModel.tickerHash.size}></TickerCount></div>
            </div>
          </section>
          <section className="add-tickers action">
            <div className="title">Add Tickers</div>
            <button onClick={() => this.onAddTickers()} disabled={!this.props.controlPanelModel.options.addTickersEnabled}>Start</button>
            <button onClick={() => this.onStopAddTickers()} disabled={this.props.controlPanelModel.options.addTickersEnabled}>Stop</button>
            <div className="frequency">
              <span className="sub-title noselect">Add Interval:&nbsp;</span>
              <i className="fa fa-minus" aria-hidden="true" onClick={() => this.onChangeAddTickerFrequency(this.props.controlPanelModel.options.addTickerIntervalMSec - 20)}></i>
              <span  className="noselect">{this.props.controlPanelModel.options.addTickerIntervalMSec}ms</span>
              <i className="fa fa-plus" aria-hidden="true" onClick={() => this.onChangeAddTickerFrequency(this.props.controlPanelModel.options.addTickerIntervalMSec + 20)}></i>
            </div>
          </section>
          <section className="update-prices action">
            <div  className="title">Change Values</div>
            <button onClick={() => this.onUpdateTickers()} disabled={!this.props.controlPanelModel.options.updateValuesEnabled}>Start</button>
            <button onClick={() => this.onStopUpdateTickers()} disabled={this.props.controlPanelModel.options.updateValuesEnabled}>Stop</button>
            <div className="frequency">
              <span  className="sub-title noselect">Update Interval:&nbsp;</span>
              <i className="fa fa-minus" aria-hidden="true" onClick={() => this.onChangeUpdateTickerFrequency(this.props.controlPanelModel.options.updateValueIntervalMSec - 10)}></i>
              <span className="noselect">{this.props.controlPanelModel.options.updateValueIntervalMSec}ms</span>
              <i className="fa fa-plus" aria-hidden="true" onClick={() => this.onChangeUpdateTickerFrequency(this.props.controlPanelModel.options.updateValueIntervalMSec + 10)}></i>
            </div>
          </section>
      </section>
    );
  }
}

export default ControlPanel;
