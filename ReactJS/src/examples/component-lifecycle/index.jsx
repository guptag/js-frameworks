/** @jsx React.DOM */

    // Isolated Component - Listens for events from other React components and renders to DOM
    // Cannot be part of the actual application since the events can occur before the app dom is mounted
    // Use this pattern sparingly
    var Notifications = React.createClass({
        render: function() {
            var notificationNodes = this.state.notifications.map(function (notification, index) {
                var infoNodes = (notification.addlInfo || []).map(function(info, infoItemIndex) {
                  return <li key={infoItemIndex}>{info}</li>;
                });

                 return <li className="notifcation" key={index}>
                          {notification.msg}
                          <ul>{infoNodes}</ul>
                        </li>;
             });

             return (
                <div>
                  <header>Events</header>
                  <ul className="notifcationlist">
                      {notificationNodes}
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

        addNotification: function (notification, startFresh) {
            var self = this;
            setTimeout(function() {
                self.setState({
                  notifications: (startFresh ? [] : self.state.notifications).concat([notification])
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
            this.props.NotificationComponent.addNotification({msg: "render", addlInfo: ["Component is rendered."]});
            return <div>{this.props.title}</div>;
        },

        getInitialState: function () {
            this.props.NotificationComponent.addNotification({
              msg: "getInitialState",
              addlInfo: ["Invoked once before the component is mounted", "The return value will be used as the initial value of this.state"]
            });
            return {};
        },

        getDefaultProps: function () {
           this.props.NotificationComponent.addNotification({
                msg:"getDefaultProps",
                addlInfo: ["Invoked once when the component is mounted",
                           "This method is invoked before getInitialState and therefore cannot rely on this.state or use this.setState."]
              }, true);
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
            this.props.NotificationComponent.addNotification({
                msg:"componentWillMount",
                addlInfo: ["Invoked once, immediately before the initial rendering occurs.",
                  "If you call setState within this method, render() will see the updated state and will be executed only once despite the state change."]
              });
        },

        componentDidMount: function () {
            this.props.NotificationComponent.addNotification({
                msg:"componentDidMount",
                addlInfo: ["Invoked immediately after rendering occurs.",
                "At this point in the lifecycle, the component has a DOM representation which you can access via this.getDOMNode()"]
              });
        },

        componentWillReceiveProps: function(/*nextProps*/) {
            this.props.NotificationComponent.addNotification({
                msg: "componentWillReceiveProps",
                addlInfo: ["Invoked when a component is receiving new props.", "This method is not called for the initial render."]
              });
        },

        shouldComponentUpdate: function(/*nextProps, nextState*/) {
            this.props.NotificationComponent.addNotification({
                msg:"shouldComponentUpdate",
                addlInfo: ["Invoked before rendering when new props or state are being received.",
                "This method is not called for the initial render or when forceUpdate is used."]
              });
            return true;
        },

        componentWillUpdate: function (/*nextProps, nextState*/) {
            this.props.NotificationComponent.addNotification({
                msg:"componentWillUpdate",
                addlInfo: ["Invoked immediately before rendering when new props or state are being received. ",
                           "This method is not called for the initial render."]
              });
        },

        componentDidUpdate: function (/*prevProps, prevState*/) {
            this.props.NotificationComponent.addNotification({
                msg:"componentDidUpdate",
                addlInfo: ["Invoked immediately after updating occurs.", "This method is not called for the initial render."]
              });
        },

        componentWillUnmount: function () {
            this.props.NotificationComponent.addNotification({
                msg:"componentWillUnmount",
                addlInfo: ["Invoked immediately before a component is unmounted from the DOM.", 
                "Perform any necessary cleanup in this method, such as invalidating timers or cleaning up any DOM elements that were created in componentDidMount."]
              });
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
