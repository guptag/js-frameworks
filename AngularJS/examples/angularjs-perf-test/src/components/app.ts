export interface IAppController {
};

class AppController implements IAppController  {
  constructor() {
  }
}

AppController.$inject = [];

angular.module('perfTest')
  .controller('AppController', AppController);





