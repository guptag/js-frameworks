import * as React from 'react';

import SectorName from './SectorName';
import CompanyName from './CompanyName';
import { ITickerData } from '../../../redux-core/reducers/domain/tickers/tickersReducer';

interface ITickerListProps {
  tickerData: ITickerData;
}

class TickerTile extends React.Component<ITickerListProps, null> {
  render() {
    return (
      <section className="ticker-tile">
          <h1>{this.props.tickerData.ticker}</h1>
          <SectorName name={this.props.tickerData.sector}></SectorName>
          <CompanyName name={this.props.tickerData.company}></CompanyName>
      </section>
    );
  }
}

export default TickerTile;