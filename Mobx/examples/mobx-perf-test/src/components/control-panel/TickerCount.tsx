import * as React from 'react';
import * as _ from 'lodash';
import {observer} from 'mobx-react';

import { tickerDataModel, ITickerData } from '../../models/TickerDataModel';

interface ITickerCountProps {
  count: number;
}

@observer
class TickerCount extends React.Component<ITickerCountProps, null> {
  render() {
    return (
      <span>{tickerDataModel.tickerHash.keys.length}</span>
    );
  }
}

export default TickerCount;
