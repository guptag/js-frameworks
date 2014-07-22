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
        getDefaultProps: function () {
           return {
              refreshIntervalInSec: 1,
              sortBy: "name",
              showFilter: "all"
            };
        },

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

        componentWillReceiveProps: function (nextProps) {
          console.log(nextProps);
          this.configureLoadData(nextProps);
        },

        configureLoadData: function (props) {
           this.clearTimer();

           // refresh data
           this._loadData(props.sortBy, props.showFilter);

           // configure periodic updates
           this.interval = setInterval(function () {
              this._loadData(props.sortBy, props.showFilter);
            }.bind(this), props.refreshIntervalInSec * 1000);
        },

        _loadData: function(sortBy, showFilter) {
          var latestData = TickerData.getLatest(sortBy, showFilter);
          this.setState({
            tickerData: latestData
          });
        },

        clearTimer: function () {
          if (this.interval) {
            window.clearInterval(this.interval);
          }
        },

        componentDidMount: function () {
          this.configureLoadData(this.props);
        },

        componentWillUnmount: function () {
          this.clearTimer();
        }
    });




    var OptionPanel = React.createClass({displayName: 'OptionPanel',
        getDefaultProps: function () {
           return {
              refreshIntervalInSec: 2,
              sortBy: "name",
              showFilter: "all",
              onOptionsUpdated: function() {}
            };
        },

        render: function() {
            return (
              React.DOM.form( {className:"optionpanel"}, 
                  React.DOM.div(null, 
                    React.DOM.span(null, "Refresh Interval (sec): " ),
                    React.DOM.input(
                        {placeholder:"Refresh Interval...",
                        defaultValue:this.props.refreshIntervalInSec,
                        ref:"refreshIntervalInput",
                        onChange:this.handleChange,
                        type:"number",
                        min:"2",
                        max:"10"}
                    )
                  ),
                  React.DOM.div( {ref:"sortOptions"}, 
                      React.DOM.span(null, "Sort By: " ),
                      React.DOM.label(null, React.DOM.input(
                          {type:"radio",
                          name:"sort",
                          value:"name",
                          onChange:this.handleChange,
                          defaultChecked:  this.props.sortBy === "name"}
                      ), " Name " ),
                      React.DOM.label(null, React.DOM.input(
                          {type:"radio",
                          name:"sort",
                          value:"change",
                          onChange:this.handleChange,
                          defaultChecked:  this.props.sortBy === "change"}
                      ), " Day Change " )
                  ),
                  React.DOM.div( {ref:"filterOptions"}, 
                      React.DOM.span(null, "Show: " ),
                      React.DOM.label(null, React.DOM.input(
                          {type:"radio",
                          name:"filter",
                          value:"all",
                          onChange:this.handleChange,
                          defaultChecked:  this.props.showFilter === "all"}
                      ), " All " ),
                      React.DOM.label(null, React.DOM.input(
                          {type:"radio",
                          name:"filter",
                          value:"gainers",
                          onChange:this.handleChange,
                          defaultChecked:  this.props.showFilter === "gainers"}
                      ), " Gainers " ),
                      React.DOM.label(null, React.DOM.input(
                          {type:"radio",
                          name:"filter",
                          value:"losers",
                          onChange:this.handleChange,
                          defaultChecked:  this.props.showFilter === "losers"}
                      ), " Losers " )
                  )
              )
          );
        },

        handleChange: function () {
            this.props.onOptionsUpdated(
                this.refs.refreshIntervalInput.getDOMNode().value,
                $('input:radio[name=sort]:checked', this.refs.sortOptions.getDOMNode()).val(),
                $('input:radio[name=filter]:checked', this.refs.filterOptions.getDOMNode()).val()
            );
        }
    });

    var Application = React.createClass({displayName: 'Application',
         getInitialState: function () {
            return {
              sortBy: "name",
              showFilter: "all",
              refreshIntervalInSec: 2
            };
        },

        onOptionsUpdated: function (refreshIntervalInSec, sortBy, showFilter) {
           this.setState({
              sortBy: sortBy,
              showFilter: showFilter,
              refreshIntervalInSec: parseInt(refreshIntervalInSec) || 2
           });

           console.log(refreshIntervalInSec, sortBy, showFilter);
        },

        render: function() {
            return (
                React.DOM.div(null, 
                  OptionPanel(
                    {sortBy:this.state.sortBy,
                    showFilter:this.state.showFilter,
                    refreshIntervalInSec:  this.state.refreshIntervalInSec,
                    onOptionsUpdated:this.onOptionsUpdated} ),
                  TickerList(
                    {sortBy:this.state.sortBy,
                    showFilter:this.state.showFilter,
                    refreshIntervalInSec:  this.state.refreshIntervalInSec} )
                )
            );
        }
    });

    React.renderComponent(Application(null), $("#content")[0]);
