import * as React from 'react';
import * as _ from 'lodash';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import TickerTile from './TickerTile';

import { IAppState } from '../../../redux-core/reducers/appReducer';
import { ITickersHash, ITickerData } from '../../../redux-core/reducers/domain/tickers/tickersReducer';

interface ITickerListProps {
  tickersHash: ITickersHash;
}

class TickerList extends React.Component<ITickerListProps, null> {
  render() {
    var tickerTiles = _.map(this.props.tickersHash, (value: ITickerData, key: string) => {
      return <TickerTile key={key} tickerData={value}></TickerTile>;
    });
    
    return (
      <section className="ticker-list">
          <h1>Ticker List</h1>
          {tickerTiles}
      </section>
    );
  }
}

// Apply sort/filter here
const mapStateToProps = (state: IAppState): ITickerListProps => ({
  tickersHash: state.domain.tickersHash
});

export default connect(mapStateToProps, null)(TickerList);