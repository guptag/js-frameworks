import * as html from './sector-name.html';

export interface ISectorNameController {
  name: string;
};

class SectorNameController implements ISectorNameController  {
  name: string;
  constructor() {
  }
}

SectorNameController.$inject = [];

angular.module('perfTest')
      .component('sectorName', {
        bindings: {
          name: '<'
        },
        template: html,
        controller: SectorNameController
    });





