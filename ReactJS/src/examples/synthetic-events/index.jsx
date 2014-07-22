/** @jsx React.DOM */

var EventsList = React.createClass({
    render: function() {
        var eventNodes = this.props.events.map(function (item, index) {
              return (<li className="event" key={index}>
                        <span>{item.handler}</span>&nbsp;
                        <span>{item.marker}</span>&nbsp;
                        <span>{item.target}</span>&nbsp;
                        <span>{item.currentTarget}</span>
                      </li>);
        });

        eventNodes.push(<li className="spacer"></li>);

        return (
            <div id="eventslist">
              <ul>
                <li className="event" key="-1">
                  <span>handler</span>&nbsp;
                  <span>reactId</span>&nbsp;
                  <span>target</span>&nbsp;
                  <span>current target</span>
                </li>
                {eventNodes}
              </ul>
            </div>
        );
    }
});

var SimpleComponent = React.createClass({
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
            <div>
               <div id="containerA" onClick={this.containerAClicked}>
                  <div id="containerB" onClick={this.containerBClicked}>
                     <div id="containerC" onClick={this.containerCClicked}></div>
                  </div>
               </div>
               <EventsList events={this.state.events}/>
           </div>
        );
    }
});

React.renderComponent(<SimpleComponent/>, $("#content")[0]);
