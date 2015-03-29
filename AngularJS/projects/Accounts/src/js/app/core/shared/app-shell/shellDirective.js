angular.module('app.core.directives')
  .directive('appShell', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/app/core/shared/app-shell/shell.html',
      replace: true,
      controller: 'ShellController',
      controllerAs: 'shellCtrl',
      link: function(scope, element, attrs) {
        console.log("shell directive - link function", scope.shellCtrl.headerModel);

      }
    };
  });