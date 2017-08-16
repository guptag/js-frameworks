import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IAppState } from '../../../redux-core/reducers/appReducer';
import { IConrolPanelOptions } from '../../../redux-core/reducers/ui/controlPanel/controlPanelReducer';
import { actions, AppAction } from '../../../redux-core/actions/actions';
import ActionSimulator from '../../../services/ActionSimulator';
import { ControlPanelActionType, ControlPanelDefaults } from "../../../redux-core/config/config";

import TickerCount from '../ticker-list/TickerCount';


interface IStateToProps {
  settings: IConrolPanelOptions;
}

interface IDispatchToProps {
  onStartAction: (actionType: ControlPanelActionType) => void;
  onStopAction: (actionType: ControlPanelActionType) => void;
  onChangeInterval: (actionType: ControlPanelActionType, increment: boolean) => void,
}


class ControlPanel extends React.Component<IStateToProps & IDispatchToProps, null> {
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

  shouldComponentUpdate (nextProps:IStateToProps & IDispatchToProps) {
    return this.props.settings !== nextProps.settings;
  }

  render() {
    return (
      <section className="control-panel">
          <h1>React/Redux Perf Test</h1>
          <section className="stats clearfix">
            <div className="stat-item">
              <div id="stats_rps" className="rps"></div>
              <i className="fa fa-info-circle stats_rps" title="Number of frames rendered in the last second(fps). App is more responsive when fps is higher. (https://github.com/mrdoob/stats.js)"></i>
            </div>
            <div className="stat-item">
              <div id="stats_ms" className="ms"></div>
              <i className="fa fa-info-circle" title="Time to render the last frame (msec). Lower values are better. (https://github.com/mrdoob/stats.js)"></i>
            </div>
            <div className="stat-item">
              <div id="stats_memory" className="mem"></div>
              <i className="fa fa-info-circle" title="Allocated memory in MB. Open Chrome with --enable-precise-memory-info to get precise informarion. (https://github.com/mrdoob/stats.js)"></i>
            </div>
          </section>
          <section className="counts clearfix">
            <div className="tickers">
              <h6>Tickers</h6>
              <div id="stats_ticker_count"><TickerCount></TickerCount></div>
            </div>
            <div className="dom">
              <h6>DOM Count</h6>
              <div id="stats_dom_count"></div>
            </div>
          </section>
          <section className="replace-tickers action">
            <div className="title">Simulate Switching views</div>
            <button onClick={() => { this.resetStats(); this.props.onStartAction(ControlPanelActionType.Replace)}} disabled={!this.props.settings.replaceTickersEnabled}>Start</button>
            <button onClick={() => this.props.onStopAction(ControlPanelActionType.Replace)} disabled={this.props.settings.replaceTickersEnabled}>Stop</button>
            <div className="frequency">
              <span className="sub-title noselect">Interval:&nbsp;</span>
              <i className="fa fa-minus" aria-hidden="true" onClick={() => this.props.onChangeInterval(ControlPanelActionType.Replace, false)}></i>
              <span  className="noselect">{this.props.settings.replaceTickerIntervalMSec}ms</span>
              <i className="fa fa-plus" aria-hidden="true" onClick={() => this.props.onChangeInterval(ControlPanelActionType.Replace, true)}></i>
            </div>
          </section>
          <section className="add-tickers action">
            <div className="title">Simulate Adds</div>
            <button onClick={() => {this.resetStats(); this.props.onStartAction(ControlPanelActionType.Add)}}  disabled={!this.props.settings.addTickersEnabled}>Start</button>
            <button onClick={() => this.props.onStopAction(ControlPanelActionType.Add)}  disabled={this.props.settings.addTickersEnabled}>Stop</button>
            <div className="frequency">
              <span className="sub-title noselect">Interval:&nbsp;</span>
              <i className="fa fa-minus" aria-hidden="true" onClick={() => this.props.onChangeInterval(ControlPanelActionType.Add, false)}></i>
              <span  className="noselect">{this.props.settings.addTickerIntervalMSec}ms</span>
              <i className="fa fa-plus" aria-hidden="true" onClick={() => this.props.onChangeInterval(ControlPanelActionType.Add, true)}></i>
            </div>
          </section>
          <section className="update-prices action">
            <div  className="title">Simulate Updates</div>
            <button onClick={() => {this.resetStats(); this.props.onStartAction(ControlPanelActionType.Update)}} disabled={!this.props.settings.updateValuesEnabled}>Start</button>
            <button onClick={() => this.props.onStopAction(ControlPanelActionType.Update)} disabled={this.props.settings.updateValuesEnabled}>Stop</button>
            <div className="frequency">
              <span className="sub-title noselect">Interval:&nbsp;</span>
              <i className="fa fa-minus" aria-hidden="true" onClick={() => this.props.onChangeInterval(ControlPanelActionType.Update, false)}></i>
              <span className="noselect">{this.props.settings.updateValuesIntervalMSec}ms</span>
              <i className="fa fa-plus" aria-hidden="true" onClick={() => this.props.onChangeInterval(ControlPanelActionType.Update, true)}></i>
            </div>
          </section>
          <section className="delete-prices action">
            <div  className="title">Simulate Deletes</div>
            <button onClick={() => this.props.onStartAction(ControlPanelActionType.Delete)} disabled={!this.props.settings.deleteTickersEnabled}>Start</button>
            <button onClick={() => this.props.onStopAction(ControlPanelActionType.Delete)} disabled={this.props.settings.deleteTickersEnabled}>Stop</button>
            <div className="frequency">
              <span className="sub-title noselect">Interval:&nbsp;</span>
              <i className="fa fa-minus" aria-hidden="true" onClick={() => this.props.onChangeInterval(ControlPanelActionType.Delete, false)}></i>
              <span className="noselect">{this.props.settings.deleteTickerIntervalMSec}ms</span>
              <i className="fa fa-plus" aria-hidden="true" onClick={() => this.props.onChangeInterval(ControlPanelActionType.Delete, true)}></i>
            </div>
          </section>
      </section>
    );
  }
}

const mapStateToProps = (state: IAppState): IStateToProps => ({
  settings: state.ui.controlPanel
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>): IDispatchToProps => ({
  onStartAction: (actionType: ControlPanelActionType) => {
    dispatch(actions.controlPanel.createToggleAction(actionType, false));
    ActionSimulator.startAction(actionType);
  },
  onStopAction: (actionType: ControlPanelActionType) => {
    dispatch(actions.controlPanel.createToggleAction(actionType, true));
    ActionSimulator.stopAction(actionType);
  },
  onChangeInterval: (actionType: ControlPanelActionType, increment: boolean) => {
    dispatch(actions.controlPanel.createChangeIntervalAction(actionType, increment));
    ActionSimulator.resetInterval(actionType);
  }
});

export default connect<IStateToProps, IDispatchToProps, {}>(mapStateToProps, mapDispatchToProps, null, {})(ControlPanel);
