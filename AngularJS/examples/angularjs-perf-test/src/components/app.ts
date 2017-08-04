export interface IAppController {
};

class AppController implements IAppController  {
    constructor(private $scope: ng.IScope) {
        console.log('hello hello');
    }
}

AppController.$inject = ['$scope'];

angular.module('perfTest')
        .controller('AppController', AppController);





