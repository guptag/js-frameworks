import * as React from 'react';

import Sector from './Sector';
import Price from './Price';
import Volume from './Volume';
import { IAppState } from '../../../redux-core/reducers/appReducer';
import { ITickerData } from '../../../redux-core/reducers/domain/tickers/tickersReducer';
import { connect } from 'react-redux';

interface ITickerTileOwnProps {
  ticker: string;
}

interface IMapToStateProps {
  tickerData: ITickerData;
}

class TickerTile extends React.Component<ITickerTileOwnProps & IMapToStateProps, null> {
  shouldComponentUpdate (nextProps: ITickerTileOwnProps & IMapToStateProps) {
    return this.props.tickerData !== nextProps.tickerData;
  }

  render() {
    return (
      <section className="ticker-tile">
          <h1 title={this.props.tickerData.company}>{this.props.tickerData.ticker}</h1>
          { /* Purposefully creating custom components for each field to simulate our scenarios */ }
          <Sector name={this.props.tickerData.sector}></Sector>
          <Price price={this.props.tickerData.price} change={this.props.tickerData.change}></Price>
          <Volume volume={this.props.tickerData.volume}></Volume>
      </section>
    );
  }
}

const mapStateToProps = (state: IAppState, ownProps: ITickerTileOwnProps): ITickerTileOwnProps & IMapToStateProps => ({
  tickerData: state.domain.tickersHash[ownProps.ticker],
  ticker: ownProps.ticker
});

export default connect(mapStateToProps, null)(TickerTile);