import * as React from 'react';
import * as _ from 'lodash';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector  } from 'reselect';

import { IAppState } from '../../../redux-core/reducers/appReducer';
import { ITickerList, ITickerData } from '../../../redux-core/reducers/domain/tickers/tickersReducer';

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

const getTickerList: (state: IAppState) => ITickerList =  (state: IAppState) => state.domain.tickersState.tickerList;
const tickerCountSelector: (state: IAppState) => number = createSelector(getTickerList, (tickerList: ITickerList) => tickerList.length);

const mapStateToProps = (state: IAppState): ITickerCountProps => ({
  count: tickerCountSelector(state)
});

export default connect(mapStateToProps, null)(TickerCount);
