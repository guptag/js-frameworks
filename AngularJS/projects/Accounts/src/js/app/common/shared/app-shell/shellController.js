(function () {

    angular.module('app.common.controllers')
           .controller('ShellController', ShellController);

    ShellController.$inject = ['HeaderModel', '$timeout'];

    function ShellController(HeaderModel, $timeout) {

        var shellCtrl = this;

        console.log("shell controller", this, arguments);

        shellCtrl.headerModel = new HeaderModel(
            "Customer Order Management System",
            "Manage your customers and orders with ease"
        );

        /*$timeout(function () {
            shellCtrl.headerModel.title = "Updated Title";
        }, 1000);*/
    };

})();
