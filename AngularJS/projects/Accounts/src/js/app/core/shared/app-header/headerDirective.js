angular.module('app.core.directives')
  .directive('appHeader', function() {
    return {
      restrict: 'E',
      scope: {
        headerModel: "="
      },
      bindToController: true,
      templateUrl: 'js/app/core/shared/app-header/header.html',
      replace: true,
      controller: 'HeaderController',
      controllerAs: 'headerCtrl',
      link: function(scope, element, attrs) {
        console.log("header directive - link function", arguments);

      }
    };
  });