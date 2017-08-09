import * as React from 'react';
import * as _ from 'lodash';
import {observer} from 'mobx-react';

interface ITickerCountProps {
  count: number;
}

class TickerCount extends React.Component<ITickerCountProps, null> {
  shouldComponentUpdate(newProps: ITickerCountProps) {
    return this.props.count !== newProps.count;
  }

  render() {
    return (
      <span>{this.props.count}</span>
    );
  }
}

export default TickerCount;
