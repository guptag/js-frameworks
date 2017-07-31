import * as React from 'react';

interface ISectorNameProps {
  name: string;
}

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