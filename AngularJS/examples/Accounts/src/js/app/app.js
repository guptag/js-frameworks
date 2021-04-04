(function () {

    angular.module('app.core', ['ngRoute', 'oc.lazyLoad']);

    angular.module('app.common.services', ['app.core']);
    angular.module('app.common.models', ['app.core']);
    angular.module('app.common.controllers', ['app.core', 'app.common.services', 'app.common.models']);
    angular.module('app.common.directives', ['app.core', 'app.common.services', 'app.common.controllers']);
    angular.module('app.common', ['app.core', 'app.templates', 'app.common.services', 'app.common.directives', 'app.common.controllers']);

    angular.module('app.customer', ['app.core', 'app.common']);

    angular.module('app', [
      'app.core',
      'app.common',
      'app.customer'
    ]).config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
      $ocLazyLoadProvider.config({
        modules: [{
          name: 'greeter',
          files: ['js/lazy-services.js', 'js/lazy-components.js']
        }]
      });
    }]);
})();