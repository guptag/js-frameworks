// Wrap global modules into factories
// so they can be DI'ed into angular controllers and directives
var core = angular.module('app.core');

// lodash
core.factory('_', function() {
  return window._;
});

// jquery
core.factory('$', function() {
  return window.jQuery;
});

// DB
core.factory('CustomerRestAPI', function() {
  return window.CustomerRestAPI;
});

// DB
core.factory('OrderRestAPI', function() {
  return window.OrderRestAPI;
});