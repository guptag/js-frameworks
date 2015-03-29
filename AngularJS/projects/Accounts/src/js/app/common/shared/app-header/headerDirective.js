angular.module('app.common.directives')
  .directive('appHeader', function(TemplatePaths) {
    return {
      restrict: 'E',
      scope: {
        headerModel: "="
      },
      bindToController: true,
      templateUrl: TemplatePaths.Shared.Header,
      replace: true,
      controller: 'HeaderController',
      controllerAs: 'headerCtrl',
      link: function(scope, element, attrs) {
        console.log("header directive - link function", arguments);

      }
    };
  });