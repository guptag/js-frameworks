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
        getDefaultProps: function () {
           return {
              refreshIntervalInSec: 1,
              sortBy: "name",
              showFilter: "all"
            };
        },

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
          setTimeout(function() {
            $(".ticker").css("backgroundColor", "aliceblue");
          }, 200);
        },

        componentWillUnmount: function () {
          this.clearTimer();
        }
    });




    var OptionPanel = React.createClass({
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
              <form id="optionPanel">
                  <div>
                    <span>Refresh Interval (sec): </span>
                    <input
                        type="text"
                        placeholder="Refresh Interval..."
                        defaultValue={this.props.refreshIntervalInSec}
                        ref="refreshIntervalInput"
                        onChange={this.handleChange}
                    />
                  </div>
                  <div ref="sortOptions">
                      <span>Sort By: </span>
                      <label><input
                          type="radio"
                          name="sort"
                          value="name"
                          onChange={this.handleChange}
                          defaultChecked = {this.props.sortBy === "name"}
                      ></input> Name </label>
                      <label><input
                          type="radio"
                          name="sort"
                          value="change"
                          onChange={this.handleChange}
                          defaultChecked = {this.props.sortBy === "change"}
                      ></input> Day Change </label>
                  </div>
                  <div ref="filterOptions">
                      <span>Show: </span>
                      <label><input
                          type="radio"
                          name="filter"
                          value="all"
                          onChange={this.handleChange}
                          defaultChecked = {this.props.showFilter === "all"}
                      ></input> All </label>
                      <label><input
                          type="radio"
                          name="filter"
                          value="gainers"
                          onChange={this.handleChange}
                          defaultChecked = {this.props.showFilter === "gainers"}
                      ></input> Gainers </label>
                      <label><input
                          type="radio"
                          name="filter"
                          value="losers"
                          onChange={this.handleChange}
                          defaultChecked = {this.props.showFilter === "losers"}
                      ></input> Losers </label>
                  </div>
              </form>
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

    var Application = React.createClass({
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
              refreshIntervalInSec: parseInt(refreshIntervalInSec) || 1
           });

           console.log(refreshIntervalInSec, sortBy, showFilter);
        },

        render: function() {
            return (
                <div>
                  <OptionPanel
                    sortBy={this.state.sortBy}
                    showFilter={this.state.showFilter}
                    refreshIntervalInSec = {this.state.refreshIntervalInSec}
                    onOptionsUpdated={this.onOptionsUpdated} />
                  <TickerList
                    sortBy={this.state.sortBy}
                    showFilter={this.state.showFilter}
                    refreshIntervalInSec = {this.state.refreshIntervalInSec} />
                </div>
            );
        }
    });

    React.renderComponent(<Application/>, $("#content")[0]);
