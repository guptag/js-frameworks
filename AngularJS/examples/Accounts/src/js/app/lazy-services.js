var GreeterService = /** @class */ (function () {
  function GreeterService() {

  }
  GreeterService.prototype.greet = function (args) {
      console.log("Greeting, world", args);
  };
  return GreeterService;
}());


angular.module('greetermodule', [])
   .service('greeterService', GreeterService);



var AnotherGreeterService = /** @class */ (function () {
  function AnotherGreeterService() {

  }
  AnotherGreeterService.prototype.greet = function (args) {
      console.log("Another Greeting, world", args);
  };
  return AnotherGreeterService;
}());

angular.module('anotherGreeterModule', [])
   .service('anotherGreeterService', AnotherGreeterService);