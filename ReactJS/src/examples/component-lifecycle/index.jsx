/** @jsx React.DOM */
    //http://facebook.github.io/react/docs/component-specs.html
    var Notifications = React.createClass({
        render: function() {
            var nodes = this.state.notifications.map(function (notification, index) {
                 return <li className="notifcation">{notification}</li>;
             });

             return (
                <div>
                  <header>Notifications</header>
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
                var currentNotifications;
                if (startFresh) {
                    currentNotifications = [msg];
                } else {
                   currentNotifications = self.state.notifications.concat([msg]);
                }
                self.setState({notifications: currentNotifications});
            }, 0);
        },

        clear: function () {
          this.setState({notifications: []});
        }
    });
    NotificationComponent = React.renderComponent(<Notifications/>, $("#notifications")[0]);



    var HelloWorld = React.createClass({
        render: function() {
            this.props.NotificationComponent.addNotification("In Render");
            return <div>{this.props.title}</div>;
        },

        getInitialState: function () {
             this.props.NotificationComponent.addNotification("Get Initial State");
             return {};
        },

        getDefaultProps: function () {
           this.props.NotificationComponent.addNotification("Get Default Props", true);
           return {
              title: "Hello World (default)",
              NotificationComponent: {
                addNotification: function(msg) {
                  console.log("addNotification - noop");
                }
              }
            };
        },

        componentWillMount: function () {
            this.props.NotificationComponent.addNotification("Component Will Mount");
        },

        componentDidMount: function () {
            this.props.NotificationComponent.addNotification("Component Did Mount");
        },

        componentWillReceiveProps: function(nextProps) {
            this.props.NotificationComponent.addNotification("Component Will Receive Props");
        },

        shouldComponentUpdate: function(nextProps, nextStat) {
            this.props.NotificationComponent.addNotification("Should Component Update");
            return true;
        },

        componentWillUpdate: function (nextProps, nextState) {
            this.props.NotificationComponent.addNotification("Component Will Update");
        },

        componentDidUpdate: function (prevProps, prevState) {
            this.props.NotificationComponent.addNotification("Component Did Update");
        },

        componentWillUnmount: function () {
            this.props.NotificationComponent.addNotification("Component will unmount");
        }
    });

    var Actions = React.createClass({
        render: function() {
            return (
                <div>
                  <button disabled={this.state.helloWorldComponent !== null ? "disabled" : ""} onClick={this.createComponent}>Create Component</button>
                  <button disabled={this.state.helloWorldComponent === null ? "false" : ""} onClick={this.updateComponentProps}>Update Component</button>
                  <button disabled={this.state.helloWorldComponent === null ? "false" : ""} onClick={this.deleteComponent}>Remove Component</button>
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

    React.renderComponent(<Actions NotificationComponent={NotificationComponent}/>, $("#actions")[0]);
