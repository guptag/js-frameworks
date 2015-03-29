/**
 *  Simulate backend api calls for Customers
 */
angular.module('app.db')
       .factory('CustomerRestAPI', function ($q) {
        var customers = [
        {
            customerCode: "CUS01",
            companyName: "Microsoft Corporation",
            ticker: "MSFT",
            website: "http://www.microsoft.com",
            primaryPhone: "450-980-7876",
            primaryAddress: {
                address1: "One Redmond Way",
                address2: "",
                city: "Redmond",
                state: "WA",
                zipcode: "98052"
            },
            secondaryAddress: {
                address1: "One Redmond Way",
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
                address1: "Ten Mountain view",
                address2: "",
                city: "Mountain View",
                state: "CA",
                zipcode: "98052"
            },
            secondaryAddress: {
                address1: "Ten Mountain view",
                address2: "",
                city: "Mountain View",
                state: "CA",
                zipcode: "98052"
            }
        }
    ];

    var CustomerRestAPI = new function () {

        this.getAllCustomers = function () {
            var deferred = $q.defer();

            // simaute latency
            setTimout(function () {
                deferred.resolve(customers);
            }, 50);

            return deferred;
        }

        this.addCustomer = function (customer) {
            var deferred = $q.defer();

            // simaute latency
            setTimout(function () {
                customer.customerCode = "CUS" + (customers.length < 10 ? "0" : "") + customers.length;
                customers.push(customer);
                deferred.resolve(customers);
            }, 100);

            return deferred;
        }

        this.findCustomerByName = function (name) {
            var deferred = $q.defer();

            // simaute latency
            setTimout(function () {
                angular.forEach(customers, function (customer) {

                });
            }, 50);

            return deferred;
        }
    }

    return CustomerRestAPI;


});

