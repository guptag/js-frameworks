(function () {

    angular.module('app.common.controllers')
           .controller('ShellController', ShellController);

    ShellController.$inject = ['HeaderModel', '$timeout'];

    function ShellController(HeaderModel, $timeout) {

        var shellCtrl = this;

        shellCtrl.headerModel = new HeaderModel("Customer Orders", "Manage in style");

        shellCtrl.test = {
            name: "hello"
        }

        shellCtrl.testVal = 5;

        console.log("shell controller", shellCtrl.headerModel);

        $timeout(function () {
            shellCtrl.headerModel.title = "Updated Title";
        }, 1000);
    };

})();
