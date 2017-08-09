import * as React from 'react';
import {observer} from 'mobx-react';

import TickerTile from './TickerTile';
import { ITickerDataViewModel, ITickerHash, ITickerData } from '../../models/TickerDataModel';
import { IControlPanelViewModel} from '../../models/ControlPanelModel';

interface ITickerListProps {
  tickerDataModel: ITickerDataViewModel;
}

@observer
class TickerList extends React.Component<ITickerListProps, null> {
  render() {
    console.log("tickerlist");
    var tickerTiles = [];
    this.props.tickerDataModel.tickerHash.forEach((value: ITickerData, key: string) => {
      tickerTiles.push(<TickerTile key={key} tickerData={value}></TickerTile>);
    });

    return (
      <section className="ticker-list">
        {tickerTiles}
      </section>
    );
  }
}

export default (TickerList);