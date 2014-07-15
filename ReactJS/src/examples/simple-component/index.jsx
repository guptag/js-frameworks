    /** @jsx React.DOM */
    var Ticker = React.createClass({
        render: function() {
            return <div>{this.props.ticker}</div>;
        },

        getDefaultProps: function () {
           return {
              ticker: ""
            };
        }
    });


    var TickerList = React.createClass({
        render: function() {
            return <div>{this.props.title}</div>;
        },

        getInitialState: function () {
            this.props.NotificationComponent.addNotification({
              msg: "getInitialState",
              addlInfo: ["Invoked once before the component is mounted", "The return value will be used as the initial value of this.state"]
            });
            return {};
        },

        componentWillMount: function () {
        },

        componentDidMount: function () {
        },

        componentWillReceiveProps: function(/*nextProps*/) {
        },

        shouldComponentUpdate: function(/*nextProps, nextState*/) {
        },

        componentWillUpdate: function (/*nextProps, nextState*/) {
        },

        componentDidUpdate: function (/*prevProps, prevState*/) {
        },

        componentWillUnmount: function () {
        }
    });

    var Application = React.createClass({
        render: function() {
            return (
                <div id="tickerlist"></div>
            );
        },

        getInitialState: function () {
            return {
              updateCount: 0,
              helloWorldComponent: null
            };
        }
    });

    React.renderComponent(<Application/>, $("#content")[0]);
