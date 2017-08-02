(function () {

    angular.module('app.customer')
           .controller('CustomerListController', CustomerListController);

    CustomerListController.$inject = ['_', '$timeout', '$routeParams', 'CustomerService'];
    function CustomerListController(_, $timeout, $routeParams, CustomerService) {
        var listCtrl = this;

        // all state variables
        listCtrl.isLoaded = false;
        listCtrl.customerList = [];

        loadData();

        // private methods (not access from template)
        function loadData() {
            CustomerService
                .getAllCustomers()
                .then(function (customers) {
                    console.log("list controller - data loaded", arguments);
                    listCtrl.customerList = customers;
                    listCtrl.isLoaded = true;
                });
        }


        // public methods (accessed from template)


        console.log("customer list controller", this, arguments);
    };

})();
