    /** @jsx React.DOM */
    var TickerItem = React.createClass({
        render: function() {
            return (
              <div className={"ticker " + (this.props.ticker.dayChange > 0 ? 'up' : 'down')}>
                <span>{this.props.ticker.symbol}</span>&nbsp;
                <span>{(this.props.ticker.open).toFixed(2)}</span>&nbsp;
                <span>{(this.props.ticker.open + this.props.ticker.dayChange).toFixed(2)}</span>&nbsp;
                <span>{this.props.ticker.dayChange}</span>
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

            return (<div className="tickerpanel">
                      {tickerNodes}
                    </div>);
        },

        getInitialState: function () {
            return {
              tickerData:[]
            };
        },

        refreshData: function () {
           console.log("TickerList - refreshdata");
           var latestData = TickerData.getLatest();
           this.setState({
              tickerData: latestData
           });
        }
    });

    var TickerListOne = React.createClass({
        render: function() {
            var tickerNodes = this.state.tickerData.map(function(ticker) {
              return <TickerItem ticker={ticker} key={ticker.symbol}></TickerItem>;
            })

            return (<div className="tickerpanel">
                      {tickerNodes}
                    </div>);
        },

        getInitialState: function () {
            return {
              tickerData:[]
            };
        },

        refreshData: function () {
           console.log("TickerListOne - refreshdata");
           var latestData = TickerData.getLatest();
           this.setState({
              tickerData: latestData
           });
        }
    });

    var TickerListTwo = React.createClass({
        render: function() {
            var tickerNodes = this.state.tickerData.map(function(ticker) {
              return <TickerItem ticker={ticker} key={ticker.symbol}></TickerItem>;
            })

            return (<div className="tickerpanel">
                      {tickerNodes}
                    </div>);
        },

        getInitialState: function () {
            return {
              tickerData:[]
            };
        },

        refreshData: function () {
           console.log("TickerListTwo - refreshdata");
           var latestData = TickerData.getLatest();
           this.setState({
              tickerData: latestData
           });
        }
    });
    var TickerListThree = React.createClass({
        render: function() {
            var tickerNodes = this.state.tickerData.map(function(ticker) {
              return <TickerItem ticker={ticker} key={ticker.symbol}></TickerItem>;
            })

            return (<div className="tickerpanel">
                      {tickerNodes}
                    </div>);
        },

        getInitialState: function () {
            return {
              tickerData:[]
            };
        },

        refreshData: function () {
           console.log("TickerListThree - refreshdata");
           var latestData = TickerData.getLatest();
           this.setState({
              tickerData: latestData
           });
        }
    });

    var Application = React.createClass({
         render: function() {
            return (
                <div>
                  <div id="actions">
                    <button className="ff_btn btn_green" onClick={this.refreshData}>Refresh Data</button>
                  </div>
                  <TickerList ref="tickerList"/>
                  <TickerListOne ref="tickerListOne"/>
                  <TickerListTwo ref="tickerListTwo"/>
                  <TickerListThree ref="tickerListThree"/>
                </div>
            );
        },

        refreshData: function () {
          console.log("button click handler");
          this.refs.tickerList.refreshData();
          this.refs.tickerListOne.refreshData();
          this.refs.tickerListTwo.refreshData();
          this.refs.tickerListThree.refreshData();
        }
    });

    React.renderComponent(<Application/>, $("#content")[0]);
