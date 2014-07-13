/** @jsx React.DOM */
    var Notifications = React.createClass({
        render: function() {
            var nodes = this.state.notifications.map(function (msg, index) {
                 return <li className="notifcation" key={index}>{msg}</li>;
             });

             return (
                <ul className="notifcationlist">
                    {nodes}
                </ul>
             );
        },

        getInitialState: function () {
            return {
              notifications: []
            };
        },

        addNotification: function (msg) {
            var currentNotifications = this.state.notifications;
            currentNotifications.push(msg);
            this.setState({notifications: currentNotifications});
        }
    });

    NotificationComponent = React.renderComponent(<Notifications/>, $("#notifications")[0]);




    var SimpleComponent = React.createClass({
        render: function() {
            this.props.NotificationComponent.addNotification("In Render");
            return <div>Hello {this.props.name}</div>;
        },

        getInitialState: function () {
             this.props.NotificationComponent.addNotification("Get Initial State");
             return {};
        },

        getDefaultProps: function () {
           this.props.NotificationComponent.addNotification("Get Default Props");
           return {
              name: "Default",
              NotificationComponent: {
                addNotification: function(msg) {
                  alert(msg);
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

    var ApplicationComponent = React.createClass({
        render: function() {
            return (
                <SimpleComponent name={this.state.name} NotificationComponent={NotificationComponent}/>
            );
        },

        getInitialState: function () {
            return {
              name: "world (created) "
            };
        },

        componentDidMount: function () {
          var self = this;
          setTimeout(function() {
              self.setState({name: "world (updated)"});
          }, 1000);

          setTimeout(function() {
              self.setState({name: "world (updated again)"});
          }, 2000);
        },
    });

    React.renderComponent(<ApplicationComponent NotificationComponent={NotificationComponent}/>, $("#appcomponent")[0]);
