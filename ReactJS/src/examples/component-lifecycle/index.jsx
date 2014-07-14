/** @jsx React.DOM */

    // Isolated Component - Listens for events from other React components and renders to DOM
    // Cannot be part of the actual application since the events can occur before the app dom is mounted
    // Use this pattern sparingly
    var Notifications = React.createClass({
        render: function() {
            var nodes = this.state.notifications.map(function (notification, index) {
                 return <li className="notifcation" key={index}>{notification}</li>;
             });

             return (
                <div>
                  <header>Events</header>
                  <ul className="notifcationlist">
                      {nodes}
                  </ul>
                </div>
             );
        },

        componentDidMount: function() {
          console.log("notifications mounted");
        },

        getInitialState: function () {
            return {
              notifications: []
            };
        },

        addNotification: function (msg, startFresh) {
            var self = this;
            setTimeout(function() {
                self.setState({
                  notifications: (startFresh ? [] : self.state.notifications).concat([msg])
                });
            }, 0);
        },

        clear: function () {
          this.setState({notifications: []});
        }
    });
    var NotificationInstance = React.renderComponent(<Notifications/>, $("#notifications")[0]);



    // This Component is created and disposed dynamically from Application
    var HelloWorld = React.createClass({
        render: function() {
            this.props.NotificationComponent.addNotification("render");
            return <div>{this.props.title}</div>;
        },

        getInitialState: function () {
             this.props.NotificationComponent.addNotification("getInitialState");
             return {};
        },

        getDefaultProps: function () {
           this.props.NotificationComponent.addNotification("getDefaultProps", true);
           return {
              title: "Hello World (default)",
              NotificationComponent: {
                addNotification: function(msg) {
                  console.log("addNotification - noop", msg);
                }
              }
            };
        },

        componentWillMount: function () {
            this.props.NotificationComponent.addNotification("componentWillMount");
        },

        componentDidMount: function () {
            this.props.NotificationComponent.addNotification("componentDidMount");
        },

        componentWillReceiveProps: function(/*nextProps*/) {
            this.props.NotificationComponent.addNotification("componentWillReceiveProps");
        },

        shouldComponentUpdate: function(/*nextProps, nextState*/) {
            this.props.NotificationComponent.addNotification("shouldComponentUpdate");
            return true;
        },

        componentWillUpdate: function (/*nextProps, nextState*/) {
            this.props.NotificationComponent.addNotification("componentWillUpdate");
        },

        componentDidUpdate: function (/*prevProps, prevState*/) {
            this.props.NotificationComponent.addNotification("componentDidUpdate");
        },

        componentWillUnmount: function () {
            this.props.NotificationComponent.addNotification("componentWillUnmount");
        }
    });

    var Application = React.createClass({
        render: function() {
            return (
                <div id="root">
                  <div id="helloworld"></div>
                  <div id="actions">
                    <button className="ff_btn btn_green" disabled={this.state.helloWorldComponent !== null ? "disabled" : ""} onClick={this.createComponent}>Create Component</button>
                    <button className="ff_btn btn_blue" disabled={this.state.helloWorldComponent === null ? "false" : ""} onClick={this.updateComponentProps}>Update Component</button>
                    <button className="ff_btn btn_orange" disabled={this.state.helloWorldComponent === null ? "false" : ""} onClick={this.deleteComponent}>Remove Component</button>
                  </div>
                </div>
            );
        },

        getInitialState: function () {
            return {
              updateCount: 0,
              helloWorldComponent: null
            };
        },

        createComponent: function () {
            this.props.NotificationComponent.addNotification("");
            this.setState({
              helloWorldComponent: React.renderComponent(<HelloWorld title={"Hello World"} NotificationComponent={this.props.NotificationComponent}/>, $("#helloworld")[0]),
              updateCount: 0
            });
        },

        updateComponentProps: function () {
            this.props.NotificationComponent.addNotification("");
            this.setState({updateCount: this.state.updateCount + 1});
            this.state.helloWorldComponent.setProps({title: "Hello World Updated (" + this.state.updateCount + ")"});
        },

        deleteComponent: function () {
          this.props.NotificationComponent.addNotification("");
          React.unmountComponentAtNode($("#helloworld")[0]);
          this.setState({
              helloWorldComponent: null
          });
        }
    });

    React.renderComponent(<Application NotificationComponent={NotificationInstance}/>, $("#content")[0]);
