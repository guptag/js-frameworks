import * as React from 'react';
import * as _ from 'lodash';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import TickerTile from './TickerTile';

import { IAppState } from '../../../redux-core/reducers/appReducer';
import { ITickerList, ITickerData } from '../../../redux-core/reducers/domain/tickers/tickersReducer';

interface ITickerListProps {
  tickerlist: ITickerList;
}

class TickerList extends React.Component<ITickerListProps, null> {
  shouldComponentUpdate (nextProps: ITickerListProps) {
    return this.props.tickerlist !== nextProps.tickerlist;
  }

  render() {
    console.log("tickerlist render");
    var tickerTiles = _.map(this.props.tickerlist, (ticker: string) => {
      return <TickerTile key={ticker} ticker={ticker}></TickerTile>;
    });

    return (
      <section className="ticker-list">
        {tickerTiles}
      </section>
    );
  }
}

// Apply sort/filter here
const mapStateToProps = (state: IAppState): ITickerListProps => ({
  tickerlist: state.domain.tickersState.tickerList
});

export default connect(mapStateToProps, null)(TickerList);