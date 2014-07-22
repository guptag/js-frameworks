    /** @jsx React.DOM */
    var TickerItem = React.createClass({displayName: 'TickerItem',
        render: function() {
            return (
              React.DOM.div( {className:"ticker " + (this.props.ticker.dayChange > 0 ? 'up' : 'down')}, 
                React.DOM.span(null, this.props.ticker.symbol)," ",
                React.DOM.span(null, (this.props.ticker.open).toFixed(2))," ",
                React.DOM.span(null, (this.props.ticker.open + this.props.ticker.dayChange).toFixed(2))," ",
                React.DOM.span(null, this.props.ticker.dayChange)
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

            return (React.DOM.div( {className:"tickerpanel"}, 
                      tickerNodes
                    ));
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

    var TickerListOne = React.createClass({displayName: 'TickerListOne',
        render: function() {
            var tickerNodes = this.state.tickerData.map(function(ticker) {
              return TickerItem( {ticker:ticker, key:ticker.symbol});
            })

            return (React.DOM.div( {className:"tickerpanel"}, 
                      tickerNodes
                    ));
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

    var TickerListTwo = React.createClass({displayName: 'TickerListTwo',
        render: function() {
            var tickerNodes = this.state.tickerData.map(function(ticker) {
              return TickerItem( {ticker:ticker, key:ticker.symbol});
            })

            return (React.DOM.div( {className:"tickerpanel"}, 
                      tickerNodes
                    ));
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
    var TickerListThree = React.createClass({displayName: 'TickerListThree',
        render: function() {
            var tickerNodes = this.state.tickerData.map(function(ticker) {
              return TickerItem( {ticker:ticker, key:ticker.symbol});
            })

            return (React.DOM.div( {className:"tickerpanel"}, 
                      tickerNodes
                    ));
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

    var Application = React.createClass({displayName: 'Application',
         render: function() {
            return (
                React.DOM.div(null, 
                  React.DOM.div( {id:"actions"}, 
                    React.DOM.button( {className:"ff_btn btn_blue", onClick:this.refreshData}, "Refresh Data")
                  ),
                  TickerList( {ref:"tickerList"}),
                  TickerListOne( {ref:"tickerListOne"}),
                  TickerListTwo( {ref:"tickerListTwo"}),
                  TickerListThree( {ref:"tickerListThree"})
                )
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

    React.renderComponent(Application(null), $("#react_content")[0]);

    $("#refresh_data").on("click", function () {
       console.log("refresh click");
       var latestData = TickerData.getLatest();
       var tickerListHtml = "";
       $.each(latestData, function(index, ticker) {
              tickerListHtml += '<div class="ticker ' + (ticker.dayChange > 0 ? 'up' : 'down') + '">' +
                '<span>' + ticker.symbol + '</span>&nbsp;' +
                '<span>' + (ticker.open).toFixed(2) + '</span>&nbsp;' +
                '<span>' + (ticker.open + ticker.dayChange).toFixed(2) + '</span>&nbsp;' +
                '<span>' + ticker.dayChange + '</span>' +
              '</div>';
        });
       $("#panel1").html(tickerListHtml);
       $("#panel2").html(tickerListHtml);
       $("#panel3").html(tickerListHtml);
       $("#panel4").html(tickerListHtml);
    })
