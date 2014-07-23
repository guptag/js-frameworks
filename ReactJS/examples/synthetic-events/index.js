/** @jsx React.DOM */

var EventsList = React.createClass({displayName: 'EventsList',
    render: function() {
        var eventNodes = this.props.events.map(function (item, index) {
              return (React.DOM.li( {className:"event", key:index}, 
                        React.DOM.span(null, item.handler)," ",
                        React.DOM.span(null, item.marker)," ",
                        React.DOM.span(null, item.target)," ",
                        React.DOM.span(null, item.currentTarget)
                      ));
        });

        eventNodes.push(React.DOM.li( {className:"spacer"}));

        return (
            React.DOM.div( {id:"eventslist"}, 
              React.DOM.ul(null, 
                React.DOM.li( {className:"event", key:"-1"}, 
                  React.DOM.span(null, "handler")," ",
                  React.DOM.span(null, "reactId")," ",
                  React.DOM.span(null, "target")," ",
                  React.DOM.span(null, "current target")
                ),
                eventNodes
              )
            )
        );
    }
});

var SimpleComponent = React.createClass({displayName: 'SimpleComponent',
    getInitialState: function() {
        return {events: []};
    },

    containerAClicked: function (_evt) {
        var self = this,
            evt = {
              handler:"handlerA",
              marker: _evt.dispatchMarker,
              target: _evt.target.id,
              currentTarget: _evt.currentTarget.id
            };

        setTimeout(function () {
          var latestEvents = self.state.events.concat([evt]);
          self.setState({
             events: latestEvents
          });
        }, 0);
    },

    containerBClicked: function (_evt) {
        var self = this,
            evt = {
              handler:"handlerB",
              marker: _evt.dispatchMarker,
              target: _evt.target.id,
              currentTarget: _evt.currentTarget.id
            };

        setTimeout(function () {
          var latestEvents = self.state.events.concat([evt]);
          self.setState({
             events: latestEvents
          });
        }, 0);
    },

    containerCClicked: function (_evt) {
        var self = this,
            evt = {
              handler:"handlerC",
              marker: _evt.dispatchMarker,
              target: _evt.target.id,
              currentTarget: _evt.currentTarget.id
            };

        setTimeout(function () {
          var latestEvents = self.state.events.concat([evt]);
          self.setState({
             events: latestEvents
          });
        }, 0);
    },

    render: function() {
        return (
            React.DOM.div(null, 
               React.DOM.div( {id:"containerA", onClick:this.containerAClicked}, 
                  React.DOM.div( {id:"containerB", onClick:this.containerBClicked}, 
                     React.DOM.div( {id:"containerC", onClick:this.containerCClicked})
                  )
               ),
               EventsList( {events:this.state.events})
           )
        );
    }
});

React.renderComponent(SimpleComponent(null), $("#content")[0]);
