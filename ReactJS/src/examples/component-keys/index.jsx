    /** @jsx React.DOM */
    var ReferenceList = React.createClass({
        render: function() {
            var itemNodes = this.props.items.map(function (item, index) {
              return <span className={"item marker marker_" + item} key={index}>{item}</span>;
            });

            return (
              <div className={"itemlist"}>
                  {itemNodes}
              </div>
            );
        },

        getDefaultProps: function () {
           return {
              items: []
           };
        }
    });


    var ListWithDefaultKeys = React.createClass({
        render: function() {
            var itemNodes = this.props.items.map(function (item, index) {
              return <span className="item highlight" key={index} data-item={item}>{item}</span>;
            });

            return (
              <div className={"itemlist"}>
                  {itemNodes}
              </div>
            );
        },

        getDefaultProps: function () {
           return {
              items: []
            };
        }
    });

    var ListWithRandomKeys = React.createClass({
        render: function() {
            var itemNodes = this.props.items.map(function (item, index) {
              return <span className={"item highlight"} key={Math.random()} data-item={item}>{item}</span>;
            });

            return (
              <div className={"itemlist"}>
                  {itemNodes}
              </div>
            );
        },

        getDefaultProps: function () {
           return {
              items: []
            };
        }
    });


    var ListWithUniqueKeys = React.createClass({
        render: function() {
            var itemNodes = this.props.items.map(function (item, index) {
              return <span className={"item highlight"} key={item} data-item={item}>{item}</span>;
            });

            return (
              <div className={"itemlist"}>
                  {itemNodes}
              </div>
            );
        },

        getDefaultProps: function () {
           return {
              items: []
            };
        }
    });


    var OptionPanel = React.createClass({
        render: function() {
            return (<div className={"options"}>
                        <button onClick={this.addToFront} disabled={this.props.disableListUpdates ? "disabled" : ""}>Add to the front</button>
                        <button onClick={this.addToEnd} disabled={this.props.disableListUpdates ? "disabled" : ""}>Add to the end</button>
                        <button onClick={this.resetLists}>Reset Lists</button>
                    </div>
                );
        },

        getDefaultProps: function () {
           return {
              addToFront: function () {},
              addToEnd: function () {},
              addToRandom: function () {},
              resetLists: function () {},
              disableListUpdates: false
            };
        },

        addToFront: function () {
            this.props.addToFront();
        },

        addToEnd: function () {
            this.props.addToEnd();
        },

        resetLists: function () {
            this.props.resetLists();
        }
    });

    var Application = React.createClass({
        render: function() {
            return (<div>
                      <ReferenceList items={this.state.referenceList} />
                      <ListWithDefaultKeys items={this.state.keyList} />
                      <ListWithRandomKeys items={this.state.keyList} />
                      <ListWithUniqueKeys items={this.state.keyList} />
                      <OptionPanel addToFront={this.addToFront}
                                   addToEnd={this.addToEnd}
                                   resetLists={this.resetLists}
                                   disableListUpdates={this.state.disableListUpdates}/>
                    </div>);
        },

        getInitialState: function () {
            return {
              referenceList:[1, 2, 3, 4, 5, 6, 7, 8, 9],
              keyList: [],
              disableListUpdates: false
            };
        },

        addToFront: function () {
            var newItem = this.state.keyList.length + 1;
            this.setState({
              keyList: [newItem].concat(this.state.keyList),
              disableListUpdates: newItem >= 9
            }, function() { this.updateMarker(newItem); });
        },

        addToEnd: function () {
          var newItem = this.state.keyList.length + 1;
          this.setState({
            keyList: this.state.keyList.concat([newItem]),
            disableListUpdates: newItem > 10
          }, function() { this.updateMarker(newItem); });
        },

        // cheating React to visualize the impact of keys in lists
        updateMarker: function (itemKey) {

          setTimeout(function() {

            console.log("update marker", itemKey);
            $(".item[data-item='" + itemKey + "']").each(function(index, item) {
                var $item = $(item);
                if (!$item.hasClass("marker")) {
                  $item.addClass("marker " + "marker_" + $item.text().trim());
                }
            });

            $("span.highlight").removeClass("highlight");
          }, 100);
        },

        resetLists: function () {
          this.setState({
            keyList: [],
            randomKeyList: [],
            uniqueKeyList: [],
            disableListUpdates: false
          });
        }
    });

    React.renderComponent(<Application/>, $("#content")[0]);
