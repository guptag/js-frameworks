    /** @jsx React.DOM */
    var TickerItem = React.createClass({displayName: 'TickerItem',
        render: function() {
            return (
              React.DOM.div( {className:"ticker " + (this.props.ticker.dayChange > 0 ? 'up' : 'down')}, 
                React.DOM.span( {className:"symbol"}, this.props.ticker.symbol),
                React.DOM.span( {className:"price"}, "$" + (this.props.ticker.open + this.props.ticker.dayChange).toFixed(2)),
                React.DOM.span( {className:"change"}, (this.props.ticker.dayChange >0 ? "+" : "-") + Math.abs(this.props.ticker.dayChange))
              )
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


    var TickerList = React.createClass({displayName: 'TickerList',
        render: function() {
            var tickerNodes = this.state.tickerData.map(function(ticker) {
              return TickerItem( {ticker:ticker, key:ticker.symbol});
            })

            return (React.DOM.div( {id:"tickerpanel"}, 
                      tickerNodes
                    ));
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

    React.renderComponent(TickerList(null), $("#content")[0]);
