(function () {

    angular.module('app.customer')
           .controller('EditCustomerController', EditCustomerController);

    EditCustomerController.$inject = ['_', '$timeout', '$routeParams', '$location', 'CustomerService'];
    function EditCustomerController(_, $timeout, $routeParams, $location, CustomerService) {

        var editCtrl = this;

        // all state variables
        editCtrl.isLoaded = false;
        editCtrl.isNew = true;
        editCtrl.customer = {};

        var customerCode = $routeParams.companycode

        if (customerCode) {
            loadData();
        } else {
            editCtrl.isLoaded = true;
        }

        // private methods (not access from template)
        function loadData() {
            CustomerService
                .findCustomerByCode(customerCode)
                .then(function (customer) {
                    console.log("edit controller - data loaded", arguments);
                    editCtrl.isLoaded = true;
                    if (customer) {
                        editCtrl.customerModel = customer;
                        editCtrl.isNew = false;
                    }
                });
        }


        // public methods (accessed from template)
        editCtrl.addNew = function () {
            CustomerService
                .addCustomer(editCtrl.customerModel)
                .then(function (customer) {
                    console.log("edit controller - added", arguments);
                    $location.path("/customers");
                });
        }

        editCtrl.update = function () {
            CustomerService
                .updateCustomer(editCtrl.customerModel)
                .then(function (customer) {
                    console.log("edit controller - updated", arguments);
                    $location.path("/customers");
                });
        }

        editCtrl.submit = function () {
            editCtrl.isNew ? editCtrl.addNew() : editCtrl.update();
        }

        editCtrl.cancel = function () {
            $location.path("/customers");
        }

        console.log("edit customer controller", this, arguments);

    };

})();
