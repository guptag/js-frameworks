    /** @jsx React.DOM */
    var ReferenceList = React.createClass({displayName: 'ReferenceList',
        render: function() {
            var itemNodes = this.props.items.map(function (item, index) {
              return React.DOM.span( {className:"item marker marker_" + item, key:index}, item);
            });

            return (
              React.DOM.div( {className:"displayrow clearfix"}, 
                React.DOM.div( {className:"title"}, 
                    "Reference color codes"
                ),
                React.DOM.div( {className:"itemlist"}, 
                    itemNodes
                )
              )
            );
        },

        getDefaultProps: function () {
           return {
              items: []
           };
        }
    });


    var ListWithDefaultKeys = React.createClass({displayName: 'ListWithDefaultKeys',
        render: function() {
            var itemNodes = this.props.items.map(function (item, index) {
              return React.DOM.span( {className:"item highlight", key:index, 'data-item':item}, item);
            });

            return (
              React.DOM.div( {className:"displayrow clearfix"}, 
                React.DOM.div( {className:"title"}, 
                    "No Key or index as key (default)"
                ),
                React.DOM.div( {className:"itemlist"}, 
                    itemNodes
                )
              )
            );
        },

        getDefaultProps: function () {
           return {
              items: []
            };
        }
    });

    var ListWithRandomKeys = React.createClass({displayName: 'ListWithRandomKeys',
        render: function() {
            var itemNodes = this.props.items.map(function (item, index) {
              return React.DOM.span( {className:"item highlight", key:Math.random(), 'data-item':item}, item);
            });

            return (
              React.DOM.div( {className:"displayrow clearfix"}, 
                React.DOM.div( {className:"title"}, 
                    "Unique random keys"
                ),
                React.DOM.div( {className:"itemlist"}, 
                    itemNodes
                )
              )
            );
        },

        getDefaultProps: function () {
           return {
              items: []
            };
        }
    });


    var ListWithUniqueKeys = React.createClass({displayName: 'ListWithUniqueKeys',
        render: function() {
            var itemNodes = this.props.items.map(function (item, index) {
              return React.DOM.span( {className:"item highlight", key:item, 'data-item':item}, item);
            });

            return (
              React.DOM.div( {className:"displayrow clearfix"}, 
                React.DOM.div( {className:"title"}, 
                    "Unique constant keys"
                ),
                React.DOM.div( {className:"itemlist"}, 
                    itemNodes
                )
              )
            );
        },

        getDefaultProps: function () {
           return {
              items: []
            };
        }
    });


    var OptionPanel = React.createClass({displayName: 'OptionPanel',
        render: function() {
            return (React.DOM.div( {className:"options"}, 
                        React.DOM.button(
                            {className:"ff_btn btn_blue",
                            onClick:this.addToFront, disabled:this.props.disableListUpdates ? "disabled" : ""}, 
                            "Add item to the front"
                        ),
                        React.DOM.button( {className:"ff_btn btn_green",
                            onClick:this.addToEnd,
                            disabled:this.props.disableListUpdates ? "disabled" : ""}, 
                            "Add item to the end"
                        ),
                        React.DOM.button(
                          {className:"ff_btn btn_red",
                          onClick:this.resetLists}, 
                            "Reset Lists"
                        )
                    )
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

    var Application = React.createClass({displayName: 'Application',
        render: function() {
            return (React.DOM.div(null, 
                      React.DOM.h3(null, "See it in action"),
                      ReferenceList( {items:this.state.referenceList} ),
                      ListWithDefaultKeys( {items:this.state.keyList} ),
                      ListWithRandomKeys( {items:this.state.keyList} ),
                      ListWithUniqueKeys( {items:this.state.keyList} ),
                      OptionPanel( {addToFront:this.addToFront,
                                   addToEnd:this.addToEnd,
                                   resetLists:this.resetLists,
                                   disableListUpdates:this.state.disableListUpdates})
                    ));
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
            disableListUpdates: newItem >= 9
          }, function() { this.updateMarker(newItem); });
        },

        // cheating React to visualize the impact of keys in lists
        updateMarker: function (itemKey) {

          setTimeout(function() {

            console.log("update marker", itemKey);
            $(".item[data-item='" + itemKey + "']", $("#content")).each(function(index, item) {
                var $item = $(item);
                if (!$item.hasClass("marker")) {
                  $item.addClass("marker " + "marker_" + $item.text().trim());
                }
            });

            $("span.highlight", $("#content")).removeClass("highlight");
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

    React.renderComponent(Application(null), $("#content")[0]);
