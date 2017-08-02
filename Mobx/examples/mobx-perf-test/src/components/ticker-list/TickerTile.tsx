import * as React from 'react';
import {observer} from 'mobx-react';

import Sector from './Sector';
import Price from './Price';
import Volume from './Volume';

import { ITickerData } from '../../models/TickerDataModel';

interface ITickerTileProps {
  tickerData: ITickerData;
}

@observer
class TickerTile extends React.Component<ITickerTileProps, null> {
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

export default TickerTile;