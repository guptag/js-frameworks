import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IAppState } from '../../../redux-core/reducers/appReducer';
import { IConrolPanelOptions } from '../../../redux-core/reducers/ui/controlPanel/controlPanelReducer';
import { actions, AppAction } from '../../../redux-core/actions/actions';
import ActionSimulator from '../../../services/actionSimulator';

interface IStateToProps {
  settings: IConrolPanelOptions;
}

interface IDispatchToProps {
  onAddTickers: () => void;
  onStopAddTickers: () => void;
  onUpdateTickers: () => void;
  onStopUpdateTickers: () => void;
  onChangeAddTickerFrequency: (frequency: number) => void,
  onChangeUpdateTickerFrequency: (frequency: number) => void
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



  render() {
    return (
      <section className="control-panel">
          <h1>Redux Perf Test</h1>
          <section className="stats">
            <div id="stats_rps" className="rps"></div>
            <div id="stats_ms" className="ms"></div>
            <div id="stats_dom_count" className="dom"></div>
          </section>
          <section className="add-tickers">
            <button onClick={this.props.onAddTickers} disabled={!this.props.settings.addTickersEnabled}>Start</button>
            <button onClick={this.props.onStopAddTickers} disabled={this.props.settings.addTickersEnabled}>Stop</button>
            <span>
              <i className="fa fa-minus" aria-hidden="true" onClick={() => this.props.onChangeAddTickerFrequency(this.props.settings.addTickerFrequency - 25)}></i>
              <span>{this.props.settings.addTickerFrequency}</span>
              <i className="fa fa-plus" aria-hidden="true" onClick={() => this.props.onChangeAddTickerFrequency(this.props.settings.addTickerFrequency + 25)}></i>
            </span>
          </section>
          <section className="update-prices">
            <button onClick={this.props.onUpdateTickers} disabled={!this.props.settings.updateValuesEnabled}>Start</button>
            <button onClick={this.props.onStopUpdateTickers} disabled={this.props.settings.updateValuesEnabled}>Stop</button>
            <span>
              <i className="fa fa-minus" aria-hidden="true" onClick={() => this.props.onChangeUpdateTickerFrequency(this.props.settings.updateValuesFrequency - 25)}></i>
              <span>{this.props.settings.updateValuesFrequency}</span>
              <i className="fa fa-plus" aria-hidden="true" onClick={() => this.props.onChangeUpdateTickerFrequency(this.props.settings.updateValuesFrequency + 25)}></i>
            </span>
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
    dispatch(actions.controlPanel.createToggleAddTickerAction());
    ActionSimulator.startAddingTickers();
  },
  onStopAddTickers: () => {
    dispatch(actions.controlPanel.createToggleAddTickerAction());
    ActionSimulator.stopAddingTickers();
  },
  onUpdateTickers: () => {
    dispatch(actions.controlPanel.createToggleUpdateValuesAction());
    ActionSimulator.startUpdatingTickers();
  },
  onStopUpdateTickers: () => {
    dispatch(actions.controlPanel.createToggleUpdateValuesAction());
    ActionSimulator.stopUpdatingTickers();
  },
  onChangeAddTickerFrequency: (frequency: number) => dispatch(actions.controlPanel.createChangeAddTickerFrequencyAction(frequency)),
  onChangeUpdateTickerFrequency: (frequency: number) => dispatch(actions.controlPanel.createChangeUpdatesFrequencyAction(frequency))
});

export default connect<IStateToProps, IDispatchToProps, {}>(mapStateToProps, mapDispatchToProps, null, {})(ControlPanel);
