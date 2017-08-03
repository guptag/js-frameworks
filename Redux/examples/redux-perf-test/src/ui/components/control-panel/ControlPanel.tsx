import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IAppState } from '../../../redux-core/reducers/appReducer';
import { IConrolPanelOptions } from '../../../redux-core/reducers/ui/controlPanel/controlPanelReducer';
import { actions, AppAction } from '../../../redux-core/actions/actions';
import ActionSimulator from '../../../services/ActionSimulator';

import TickerCount from './TickerCount';


interface IStateToProps {
  settings: IConrolPanelOptions;
}

interface IDispatchToProps {
  onAddTickers: () => void;
  onStopAddTickers: () => void;
  onUpdateTickers: () => void;
  onStopUpdateTickers: () => void;
  onChangeAddTickerDelay: (frequency: number) => void,
  onChangeUpdateTickerDelay: (frequency: number) => void
}


class ControlPanel extends React.Component<IStateToProps & IDispatchToProps, null> {
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

  shouldComponentUpdate (nextProps:IStateToProps & IDispatchToProps) {
    return this.props.settings !== nextProps.settings;
  }

  render() {
    return (
      <section className="control-panel">
          <h1>Redux Perf Test</h1>
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
              <div id="stats_ticker_count"><TickerCount></TickerCount></div>
            </div>
          </section>
          <section className="add-tickers action">
            <div className="title">Add Tickers</div>
            <button onClick={this.props.onAddTickers} disabled={!this.props.settings.addTickersEnabled}>Start</button>
            <button onClick={this.props.onStopAddTickers} disabled={this.props.settings.addTickersEnabled}>Stop</button>
            <div className="frequency">
              <span className="sub-title noselect">Add Interval:&nbsp;</span>
              <i className="fa fa-minus" aria-hidden="true" onClick={() => this.props.onChangeAddTickerDelay(this.props.settings.addTickerDelayMsec - 20)}></i>
              <span  className="noselect">{this.props.settings.addTickerDelayMsec}ms</span>
              <i className="fa fa-plus" aria-hidden="true" onClick={() => this.props.onChangeAddTickerDelay(this.props.settings.addTickerDelayMsec + 20)}></i>
            </div>
          </section>
          <section className="update-prices action">
            <div  className="title">Update Values</div>
            <button onClick={this.props.onUpdateTickers} disabled={!this.props.settings.updateValuesEnabled}>Start</button>
            <button onClick={this.props.onStopUpdateTickers} disabled={this.props.settings.updateValuesEnabled}>Stop</button>
            <div className="frequency">
              <span className="sub-title noselect">Update Interval:&nbsp;</span>
              <i className="fa fa-minus" aria-hidden="true" onClick={() => this.props.onChangeUpdateTickerDelay(this.props.settings.updateValuesDelayMsec - 10)}></i>
              <span className="noselect">{this.props.settings.updateValuesDelayMsec}ms</span>
              <i className="fa fa-plus" aria-hidden="true" onClick={() => this.props.onChangeUpdateTickerDelay(this.props.settings.updateValuesDelayMsec + 10)}></i>
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
  onAddTickers: () => {
    dispatch(actions.controlPanel.createToggleAddTickerAction(false));
    ActionSimulator.startAddingTickers();
  },
  onStopAddTickers: () => {
    dispatch(actions.controlPanel.createToggleAddTickerAction(true));
    ActionSimulator.stopAddingTickers();
  },
  onUpdateTickers: () => {
    dispatch(actions.controlPanel.createToggleUpdateValuesAction(false));
    ActionSimulator.startUpdatingTickers();
  },
  onStopUpdateTickers: () => {
    dispatch(actions.controlPanel.createToggleUpdateValuesAction(true));
    ActionSimulator.stopUpdatingTickers();
  },
  onChangeAddTickerDelay: (frequency: number) => dispatch(actions.controlPanel.createChangeAddTickerDelayAction(frequency)),
  onChangeUpdateTickerDelay: (frequency: number) => dispatch(actions.controlPanel.createChangeUpdatesDelayAction(frequency))
});

export default connect<IStateToProps, IDispatchToProps, {}>(mapStateToProps, mapDispatchToProps, null, {})(ControlPanel);
