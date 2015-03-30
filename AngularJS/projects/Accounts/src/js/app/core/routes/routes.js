(function () {


    var core = angular.module('app.core');

    core.config(['$routeProvider', 'TemplatePaths',
        function($routeProvider, TemplatePaths) {
            $routeProvider.
                when('/customers', {
                    templateUrl: TemplatePaths.Customers.List,
                    controller: 'CustomerListController',
                    controllerAs: 'listCtrl'
                }).
                when('/customers/edit/:companycode', {
                    templateUrl: TemplatePaths.Customers.Edit,
                    controller: 'EditCustomerController',
                    controllerAs: 'editCtrl'
                }).
                when('/customers/add', {
                    templateUrl: TemplatePaths.Customers.Edit,
                    controller: 'EditCustomerController',
                    controllerAs: 'editCtrl'
                }).
                otherwise({
                    redirectTo: '/customers'
                });
        }]);

})();