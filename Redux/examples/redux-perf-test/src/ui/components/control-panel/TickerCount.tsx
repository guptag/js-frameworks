import * as React from 'react';
import * as _ from 'lodash';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector  } from 'reselect';

import { IAppState } from '../../../redux-core/reducers/appReducer';
import { ITickerHash, ITickerData } from '../../../redux-core/reducers/domain/tickers/tickersReducer';

interface ITickerCountProps {
  count: number;
}

class TickerCount extends React.Component<ITickerCountProps, null> {
  render() {
    return (
      <span>{this.props.count}</span>
    );
  }
}

const getTickerHash: (state: IAppState) => ITickerHash =  (state: IAppState) => state.domain.tickersHash;
const tickerCountSelector: (state: IAppState) => number = createSelector(getTickerHash, tickersHash => Object.keys(tickersHash).length);

const mapStateToProps = (state: IAppState): ITickerCountProps => ({
  count: tickerCountSelector(state)
});

export default connect(mapStateToProps, null)(TickerCount);
