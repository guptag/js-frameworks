angular.module('app.common.models')
       .factory('CustomerModel', ['_', function (_) {
    /**
     * CustomerModel
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
        }
     */
    function CustomerModel(data) {
        _.extend(this, data);
    }

    /**
     * [getCompanyName description]
     * @return {[type]} [description]
     */
    CustomerModel.prototype.formattedAddress = function (address) {
        return address ? [(address.address1 || "") + " ",
                           address.address2 ? address.address2 + " " : "",
                            (address.city || "")+ " ",
                            (address.state || "") + " ",
                            (address.zipcode || "")].join("").trim(): "";
    }

    //static method
    CustomerModel.createNew = function () {
        return new customer(
            {
                customerCode: "",
                companyName: "",
                ticker: "",
                website: "",
                primaryPhone: "",
                primaryAddress: {
                    address1: "",
                    address2: "",
                    city: "",
                    state: "",
                    zipcode: ""
                },
                secondaryAddress: {
                    address1: "",
                    address2: "",
                    city: "",
                    state: "",
                    zipcode: ""
                }
            }
        );
    }

    return CustomerModel;
}]);