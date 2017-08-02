import * as React from 'react';
import * as _ from 'lodash';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import TickerTile from './TickerTile';

import { IAppState } from '../../../redux-core/reducers/appReducer';
import { ITickerHash, ITickerData } from '../../../redux-core/reducers/domain/tickers/tickersReducer';

interface ITickerListProps {
  tickersHash: ITickerHash;
}

class TickerList extends React.Component<ITickerListProps, null> {
  shouldComponentUpdate (nextProps:ITickerListProps) {
    return (Object.keys(this.props.tickersHash).length !== Object.keys(nextProps.tickersHash).length);
  }

  render() {
    console.log("tickerlist");
    var tickerTiles = _.map(this.props.tickersHash, (value: ITickerData, key: string) => {
      return <TickerTile key={key} ticker={key}></TickerTile>;
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
  tickersHash: state.domain.tickersHash
});

export default connect(mapStateToProps, null)(TickerList);