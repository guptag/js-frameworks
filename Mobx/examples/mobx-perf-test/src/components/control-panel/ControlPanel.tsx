import * as React from 'react';
import {observer} from 'mobx-react';
import { ControlPanelActionType, ControlPanelDefaults, ActionDefaults } from "../../config/config";
import { ITickerDataViewModel } from '../../models/TickerDataModel';
import { IControlPanelViewModel, IConrolPanelOptions} from '../../models/ControlPanelModel';
import ActionSimulator from '../../services/actionSimulator';
import TickerCount from '../ticker-list/TickerCount';

interface IControlPanelProps {
  controlPanelModel: IControlPanelViewModel;
  tickerDataModel: ITickerDataViewModel;
}

@observer
class ControlPanel extends React.Component<IControlPanelProps, null> {
  private resetStats: ()=> void = function() {};

  componentDidMount() {
    var statsFps = new window["Stats"](0);
    statsFps.showPanel();

    var statsMs = new window["Stats"](1);
    statsMs.showPanel();

    var statsMemory = new window["Stats"](2);
    statsMemory.showPanel();

    document.getElementById("stats_rps").appendChild(statsFps.dom);
    document.getElementById("stats_ms").appendChild(statsMs.dom);
    document.getElementById("stats_memory").appendChild(statsMemory.dom);
    requestAnimationFrame(function loop() {
      statsFps.update();
      statsMs.update();
      statsMemory.update();
      document.getElementById("stats_dom_count").innerText = document.getElementsByTagName('*').length.toString();
      requestAnimationFrame(loop)
    });

    this.resetStats = () => {
      statsFps.reset();
      statsMs.reset();
      statsMemory.reset();
    }
  }

  onStartAction(actionType: ControlPanelActionType) {
    this.resetStats();
    this.props.controlPanelModel.toggleAction(actionType, false);
    ActionSimulator.startAction(actionType);
  }

  onStopAction(actionType: ControlPanelActionType) {
    this.props.controlPanelModel.toggleAction(actionType, true);
    ActionSimulator.stopAction(actionType);
  }

  onChangeInterval(actionType: ControlPanelActionType, increment: boolean) {
    this.props.controlPanelModel.changeActionInterval(actionType, increment);
    ActionSimulator.resetInterval(actionType);
  }

  render() {
    return (
      <section className="control-panel">
        <h1>React/Mobx Perf Test</h1>
        <section className="stats clearfix">
          <div className="stat-item">
            <div id="stats_rps" className="rps"></div>
            <i className="fa fa-info-circle stats_rps" title="Number of frames rendered in the last second(fps). App is more responsive when fps is higher. (https://github.com/mrdoob/stats.js)"></i>
          </div>
          <div className="stat-item">
            <div id="stats_ms" className="ms"></div>
            <i className="fa fa-info-circle" title="Time to render the frame (msec). Lower values are better. (https://github.com/mrdoob/stats.js)"></i>
          </div>
          <div className="stat-item">
            <div id="stats_memory" className="mem"></div>
            <i className="fa fa-info-circle" title="Allocated memory in MB. Open Chrome with --enable-precise-memory-info to get precise informarion. (https://github.com/mrdoob/stats.js)"></i>
          </div>
        </section>
        <section className="counts clearfix">
          <div className="tickers">
            <h6>Tickers</h6>
            <div id="stats_ticker_count"><TickerCount count={this.props.tickerDataModel.tickerHash.size}></TickerCount></div>
          </div>
          <div className="dom">
            <h6>DOM Count</h6>
            <div id="stats_dom_count"></div>
          </div>
        </section>
        <section className="replace-tickers action">
          <div className="title">Simulate Switching views</div>
          <button onClick={() => this.onStartAction(ControlPanelActionType.Replace)} disabled={!this.props.controlPanelModel.options.replaceTickersEnabled}>Start</button>
          <button onClick={() => this.onStopAction(ControlPanelActionType.Replace)} disabled={this.props.controlPanelModel.options.replaceTickersEnabled}>Stop</button>
          <div className="frequency">
            <span className="sub-title noselect">Interval:&nbsp;</span>
            <i className="fa fa-minus" aria-hidden="true" onClick={() => this.onChangeInterval(ControlPanelActionType.Replace, false)}></i>
            <span  className="noselect">{this.props.controlPanelModel.options.replaceTickerIntervalMSec}ms</span>
            <i className="fa fa-plus" aria-hidden="true" onClick={() => this.onChangeInterval(ControlPanelActionType.Replace, true)}></i>
          </div>
        </section>
       <section className="add-tickers action">
          <div className="title">Simulate Adds</div>
          <button onClick={() => this.onStartAction(ControlPanelActionType.Add)}  disabled={!this.props.controlPanelModel.options.addTickersEnabled}>Start</button>
          <button onClick={() => this.onStopAction(ControlPanelActionType.Add)}  disabled={this.props.controlPanelModel.options.addTickersEnabled}>Stop</button>
          <div className="frequency">
            <span className="sub-title noselect">Interval:&nbsp;</span>
            <i className="fa fa-minus" aria-hidden="true" onClick={() => this.onChangeInterval(ControlPanelActionType.Add, false)}></i>
            <span  className="noselect">{this.props.controlPanelModel.options.addTickerIntervalMSec}ms</span>
            <i className="fa fa-plus" aria-hidden="true" onClick={() => this.onChangeInterval(ControlPanelActionType.Add, true)}></i>
          </div>
        </section>
        <section className="update-prices action">
          <div  className="title">Simulate Updates</div>
          <button onClick={() => this.onStartAction(ControlPanelActionType.Update)} disabled={!this.props.controlPanelModel.options.updateValuesEnabled}>Start</button>
          <button onClick={() => this.onStopAction(ControlPanelActionType.Update)} disabled={this.props.controlPanelModel.options.updateValuesEnabled}>Stop</button>
          <div className="frequency">
            <span className="sub-title noselect">Interval:&nbsp;</span>
            <i className="fa fa-minus" aria-hidden="true" onClick={() => this.onChangeInterval(ControlPanelActionType.Update, false)}></i>
            <span className="noselect">{this.props.controlPanelModel.options.updateValuesIntervalMSec}ms</span>
            <i className="fa fa-plus" aria-hidden="true" onClick={() => this.onChangeInterval(ControlPanelActionType.Update, true)}></i>
          </div>
        </section>
        <section className="delete-prices action">
          <div  className="title">Simulate Deletes</div>
          <button onClick={() => this.onStartAction(ControlPanelActionType.Delete)} disabled={!this.props.controlPanelModel.options.deleteTickersEnabled}>Start</button>
          <button onClick={() => this.onStopAction(ControlPanelActionType.Delete)} disabled={this.props.controlPanelModel.options.deleteTickersEnabled}>Stop</button>
          <div className="frequency">
            <span className="sub-title noselect">Interval:&nbsp;</span>
            <i className="fa fa-minus" aria-hidden="true" onClick={() => this.onChangeInterval(ControlPanelActionType.Delete, false)}></i>
            <span className="noselect">{this.props.controlPanelModel.options.deleteTickerIntervalMSec}ms</span>
            <i className="fa fa-plus" aria-hidden="true" onClick={() => this.onChangeInterval(ControlPanelActionType.Delete, true)}></i>
          </div>
        </section>
      </section>
    );
  }
}

export default ControlPanel;
