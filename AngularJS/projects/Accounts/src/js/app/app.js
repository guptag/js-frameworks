(function () {

    angular.module('app.core.services', []);
    angular.module('app.core.models', []);
    angular.module('app.core.controllers', ['app.core.services', 'app.core.models']);
    angular.module('app.core.directives', ['app.core.services', 'app.core.controllers']);
    angular.module('app.core', ['app.core.services', 'app.core.directives', 'app.core.controllers']);

    angular.module('app', [
      'ngRoute',
      'app.core',
      //'app.customers'
    ]);

})();