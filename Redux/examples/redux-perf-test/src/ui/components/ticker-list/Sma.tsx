import * as React from 'react';

interface ISmaProps {
  label: string;
  value: number;
}

interface ISmaState {
  smaChanged: boolean;
}

class Sma extends React.Component<ISmaProps, ISmaState> {
  constructor() {
    super();
    this.state = {
      smaChanged: false
    };
  }

  componentWillReceiveProps (nextProps: ISmaProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        smaChanged: true
      });

      setTimeout(() => {
        this.setState({
          smaChanged: false
        });
      }, 100);
    }
  }


  shouldComponentUpdate (nextProps:ISmaProps, nextState: ISmaState) {
    return (this.props.value !== nextProps.value)  || (this.state.smaChanged !== nextState.smaChanged);;
  }

  render() {
    return (
      <div className={`sma ${this.state.smaChanged ? 'sma-changed' : ''}`}>
        {this.props.label}:&nbsp;{this.props.value.toFixed(2)}
      </div>
    );
  }
}

export default Sma;