    /** @jsx React.DOM */
    var Ticker = React.createClass({
        render: function() {
            return (<div key={this.props.ticker.symbol}>
              <span>{this.props.ticker.symbol}</span>&nbsp;
              <span>{(this.props.ticker.open).toFixed(2)}</span>&nbsp;
              <span>{(this.props.ticker.open + this.props.ticker.dayChange).toFixed(2)}</span>&nbsp;
              <span>{this.props.ticker.dayChange}</span>
            </div>);
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
              return <Ticker ticker={ticker}></Ticker>;
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
          this.interval = setInterval(this.loadData, 1000);
        },

        componentWillUnmount: function () {
          clearInterval(this.interval);
        }
    });

    var Application = React.createClass({
        render: function() {
            return (
                <TickerList></TickerList>
            );
        }
    });

    React.renderComponent(<Application/>, $("#content")[0]);
