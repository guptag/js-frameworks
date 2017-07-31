import * as React from 'react';

interface IVolumeProps {
  volume: number;
}

class Volume extends React.Component<IVolumeProps, null> {
  render() {
    return (
      <div className="volume">
        V:{this.props.volume.toFixed(0)}
      </div>
    );
  }
}

export default Volume;