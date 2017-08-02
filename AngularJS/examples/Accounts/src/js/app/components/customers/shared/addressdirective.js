angular.module('app.customer')
  .controller('CustomerAddressController', ['_', function(_) {
      var addressCtrl = this;
      console.log("Address Controller", arguments);
  }])
  .directive('customerAddress', function(TemplatePaths) {
    return {
      restrict: 'E',
      scope: {
        address: "=",
        title: "@"
      },
      bindToController: true,
      templateUrl: TemplatePaths.Customers.AddressDirective,
      replace: true,
      controller: 'CustomerAddressController',
      controllerAs: 'addressCtrl',
      link: function(scope, element, attrs) {
        console.log("address directive - link function", arguments);

      }
    };
  });