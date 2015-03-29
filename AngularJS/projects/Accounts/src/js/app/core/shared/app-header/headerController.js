(function () {

    angular.module('app.core.controllers')
           .controller('HeaderController', ShellController);

    ShellController.$inject = ['$timeout'];

    function ShellController($timeout) {

        var headerCtrl = this;

        console.log("header controller", this, arguments);

        $timeout(function () {
            headerCtrl.headerModel.title = "Shiny new title";
        }, 4000);

    };

})();
