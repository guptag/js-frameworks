(function () {

    angular.module('app.core', ['ngRoute']);

    angular.module('app.common.services', ['app.core']);
    angular.module('app.common.models', ['app.core']);
    angular.module('app.common.controllers', ['app.core', 'app.common.services', 'app.common.models']);
    angular.module('app.common.directives', ['app.core', 'app.common.services', 'app.common.controllers']);
    angular.module('app.common', ['app.core', 'app.common.services', 'app.common.directives', 'app.common.controllers']);

    angular.module('app.customer', ['app.core', 'app.common']);

    angular.module('app', [
      'app.core',
      'app.common',
      'app.customer'
    ]);

})();