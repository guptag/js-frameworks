/**
 *  Simulate backend api calls for Customers
 *
 * // CustomerRestAPI.getAllCustomers().then(function (customers) { console.log(customers); })
 * // CustomerRestAPI.findCustomerByName("micro").then(function (customer) { console.log(customer); })
 */
var common = angular.module('app.common');

angular.module('app.common')
       .factory('CustomerRestAPI', CustomerRestAPI);

CustomerRestAPI.$inject = ['_', '$q', '$timeout'];
function CustomerRestAPI(_, $q, $timeout) {
    //var $q = angular.injector(["ng"]).get("$q");
    //var $timeout = angular.injector(["ng"]).get("$timeout");

    var customers = [
        {
            customerCode: "CUS01",
            companyName: "Microsoft Corporation",
            ticker: "MSFT",
            website: "http://www.microsoft.com",
            primaryPhone: "450-980-7876",
            primaryAddress: {
                address1: "One Redmond Way 1",
                address2: "",
                city: "Redmond",
                state: "WA",
                zipcode: "98052"
            },
            secondaryAddress: {
                address1: "One Redmond Way 2",
                address2: "",
                city: "Redmond",
                state: "WA",
                zipcode: "98052"
            }
        },
        {
            customerCode: "CUS02",
            companyName: "Google Inc",
            ticker: "GOOG",
            website: "http://www.google.com",
            primaryPhone: "645-240-1716",
            primaryAddress: {
                address1: "Ten Mountain view 1",
                address2: "",
                city: "Mountain View",
                state: "CA",
                zipcode: "98052"
            },
            secondaryAddress: {
                address1: "Ten Mountain view 2",
                address2: "",
                city: "Mountain View",
                state: "CA",
                zipcode: "98052"
            }
        }
    ];

    return {
        getAllCustomers: function () {
            var deferred = $q.defer();

            // simaute latency
            $timeout(function () {
                deferred.resolve(customers);
            }, 250);

            return deferred.promise;
        },

        addCustomer: function (customerStr) {
            var deferred = $q.defer();

            // simaute latency
            $timeout(function () {
                var customer = JSON.parse(customerStr);
                customer.customerCode = "CUS" + (customers.length < 10 ? "0" : "") + (customers.length + 1);
                customers.push(customer);
                deferred.resolve(customer);
            }, 250);

            return deferred.promise;
        },

        updateCustomer: function (customerStr) {
            var deferred = $q.defer();

            $timeout(function () {
                var customerToUpdate = JSON.parse(customerStr);
                var matchedIndex = _.findIndex(customers, function(customer) {
                    return customer.companyCode === customerToUpdate.companyCode;
                });

                customers[matchedIndex] = customerToUpdate;

                deferred.resolve(customerToUpdate);

            }, 250);

            return deferred.promise;
        },

        findCustomerByCode: function (companyCode) {
            var deferred = $q.defer();

            companyCode = (companyCode || "").toLowerCase();

            // simaute latency
            $timeout(function () {
                var matchedCustomer = _.find(customers, function (customer) {
                    return customer.customerCode.toLowerCase() === companyCode;
                });
                deferred.resolve(_.clone(matchedCustomer,true));
            }, 250);

            return deferred.promise;
        }
    }
};