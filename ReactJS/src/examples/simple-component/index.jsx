    /** @jsx React.DOM */
    var TickerItem = React.createClass({
        render: function() {
            return (
              <div className={"ticker " + (this.props.ticker.dayChange > 0 ? 'up' : 'down')}>
                <span className="symbol">{this.props.ticker.symbol}</span>
                <span className="price">{"$" + (this.props.ticker.open + this.props.ticker.dayChange).toFixed(2)}</span>
                <span className="change">{(this.props.ticker.dayChange >0 ? "+" : "-") + Math.abs(this.props.ticker.dayChange)}</span>
              </div>
            );
        },

        getDefaultProps: function () {
           return {
              ticker: {
                symbol: "",
                open: 0,
                dayChange: 0
              }
            };
        }
    });


    var TickerList = React.createClass({
        render: function() {
            var tickerNodes = this.state.tickerData.map(function(ticker) {
              return <TickerItem ticker={ticker} key={ticker.symbol}></TickerItem>;
            })

            return (<div id="tickerpanel">
                      {tickerNodes}
                    </div>);
        },

        getInitialState: function () {
            return {
              tickerData:[]
            };
        },

        loadData: function () {
           var latestData = TickerData.getLatest();
           this.setState({
              tickerData: latestData
           });
        },

        componentDidMount: function () {
          this.loadData();
          this.interval = setInterval(this.loadData, 5000);
        },

        componentWillUnmount: function () {
          clearInterval(this.interval);
        }
    });

    React.renderComponent(<TickerList/>, $("#content")[0]);
