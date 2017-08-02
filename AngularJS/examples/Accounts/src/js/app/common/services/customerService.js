var common = angular.module('app.common');

angular.module('app.common')
       .factory('CustomerService', CustomerService);

CustomerService.$inject = ['_', 'CustomerRestAPI', 'CustomerModel'];
function CustomerService(_, CustomerRestAPI, CustomerModel) {

    return {
        getAllCustomers: function () {
            return CustomerRestAPI.getAllCustomers()
                    .then(function (customers) {
                        return _.map(customers, function (customer) {
                            return new CustomerModel(customer);
                        });
                    });
        },
        findCustomerByCode: function (code) {
            return CustomerRestAPI.findCustomerByCode(code)
                    .then(function (customer) {
                        return customer ? new CustomerModel(customer) : null;
                    });
        },

        updateCustomer: function (customer) {
            return CustomerRestAPI.updateCustomer(JSON.stringify(customer))
                    .then(function (customer) {
                        return customer;
                    });
        },

        addCustomer: function (customer) {
            return CustomerRestAPI.addCustomer(JSON.stringify(customer))
                    .then(function (customer) {
                        return customer;
                    });
        }
    }


};
