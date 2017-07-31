import * as React from 'react';

interface IVolumeProps {
  volume: number;
}

interface IVolumeState {
  volChanged: boolean;
}

class Volume extends React.Component<IVolumeProps, IVolumeState> {
  constructor() {
    super();
    this.state = {
      volChanged: false
    };
  }

  componentWillReceiveProps (nextProps: IVolumeProps) {
    if (this.props.volume !== nextProps.volume) {
      this.setState({
        volChanged: true
      });

      setTimeout(() => {
        this.setState({
          volChanged: false
        });
      }, 100);
    }
  }


  shouldComponentUpdate (nextProps:IVolumeProps, nextState: IVolumeState) {
    return (this.props.volume !== nextProps.volume)  || (this.state.volChanged !== nextState.volChanged);;
  }

  render() {
    return (
      <div className={`volume ${this.state.volChanged ? 'vol-changed' : ''}`}>
        V:{this.props.volume.toFixed(0)}
      </div>
    );
  }
}

export default Volume;