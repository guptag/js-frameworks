import * as React from 'react';
import {observer} from 'mobx-react';

interface ISectorNameProps {
  name: string;
}

@observer
class SectorName extends React.Component<ISectorNameProps, null> {
  shouldComponentUpdate (nextProps:ISectorNameProps) {
    return this.props.name !== nextProps.name;
  }

  render() {
    return (
      <section className="sector">
          <div>{this.props.name}</div>
      </section>
    );
  }
}

export default SectorName;