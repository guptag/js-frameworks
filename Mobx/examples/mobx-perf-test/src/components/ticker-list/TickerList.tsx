import * as React from 'react';
import {observer} from 'mobx-react';

import TickerTile from './TickerTile';
import { ITickerDataViewModel, ITickerHash, ITickerData, tickerDataModel } from '../../models/TickerDataModel';
import { IControlPanelViewModel} from '../../models/ControlPanelModel';

interface ITickerListProps {
  tickerDataModel: ITickerDataViewModel;
}

@observer
class TickerList extends React.Component<ITickerListProps, null> {
  render() {
    console.log("tickerlist render");
    var tickerTiles = this.props.tickerDataModel.tickerList.map((ticker: string) => {
      return <TickerTile key={ticker} tickerData={tickerDataModel.tickerHash.get(ticker)}></TickerTile>;
    });

    return (
      <section className="ticker-list">
        {tickerTiles}
      </section>
    );
  }
}

export default (TickerList);