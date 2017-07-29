angular.module('app.common.directives')
  .directive('appShell', ['TemplatePaths', function(TemplatePaths) {
    return {
      restrict: 'E',
      templateUrl: TemplatePaths.Shared.Shell,
      replace: true,
      controller: 'ShellController',
      controllerAs: 'shellCtrl',
      link: function(scope, element, attrs) {
        console.log("shell directive - link function", scope.shellCtrl.headerModel);

      }
    };
  }]);