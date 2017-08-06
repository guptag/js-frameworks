import * as React from 'react';

interface IPriceProps {
  price: number;
  change: number;
}

interface IPriceState {
  priceChanged: boolean;
}

class Price extends React.Component<IPriceProps, IPriceState> {
  constructor() {
    super();
    this.state = {
      priceChanged: false
    };
  }

  componentWillReceiveProps (nextProps: IPriceProps) {
    if (this.props.price !== nextProps.price) {
      this.setState({
        priceChanged: true
      });

      setTimeout(() => {
        this.setState({
          priceChanged: false
        });
      }, 100);
    }
  }

  shouldComponentUpdate (nextProps:IPriceProps, nextState: IPriceState) {
    return (this.props.price !== nextProps.price) || (this.state.priceChanged !== nextState.priceChanged);
  }

  render() {
    return (
      <div className={`price ${this.state.priceChanged ? 'price-changed' : ''}`}>
        P:&nbsp;{this.props.price.toFixed(2)}(<span className="change">{this.props.change.toFixed(2)}</span>)
      </div>
    );
  }
}

export default Price;