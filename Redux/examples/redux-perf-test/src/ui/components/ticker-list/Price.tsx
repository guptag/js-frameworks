import * as React from 'react';

interface IPriceProps {
  price: number;
  change: number;
}

interface IPriceState {
  changed: boolean;
}

class Price extends React.Component<IPriceProps, IPriceState> {
  constructor() {
    super();
    /*this.state = {
      changed: false
    };*/
  }

  componentWillReceiveProps (nextProps: IPriceProps) {
    /*if (this.props !== nextProps) {
      this.setState({
        changed: true
      });

      setTimeout(() => {
        console.log("settimeout");
        this.setState({
          changed: false
        });
      }, 100);
    }*/
  }

  shouldComponentUpdate (nextProps:IPriceProps, nextState: IPriceState) {
    return this.props !== nextProps/* || this.state.changed !== nextState.changed*/;
  }

  render() {
    // ${this.state.changed ? 'changed' : ''}
    return (
      <div className={`price`}>
        P:{this.props.price.toFixed(2)}(<span className="change">{this.props.change.toFixed(2)}</span>)
      </div>
    );
  }
}

export default Price;