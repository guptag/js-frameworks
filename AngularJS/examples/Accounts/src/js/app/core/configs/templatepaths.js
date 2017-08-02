(function () {
    var core = angular.module('app.core');

    // paths to the templates
    core.constant('TemplatePaths', {
        Shared: {
            Shell: "js/app/common/shared/app-shell/shell.html",
            Header: "js/app/common/shared/app-header/header.html"
        },
        Customers: {
            List: "js/app/components/customers/list/customerList.html",
            Edit: "js/app/components/customers/edit/editCustomer.html",
            AddressDirective: "js/app/components/customers/shared/address.html"
        },
        Orders: {

        }
    });

})();
