require('angular');
require('angular-animate');
require('angular-route');
require('angular-sanitize');

//cache router html entries
import * as html from './components/app.html';

angular.module('perfTest', ['ngRoute', 'ngSanitize', 'ngAnimate'])
  .config(['$routeProvider', '$sceDelegateProvider',

  function($routeProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist(['**']);

    $routeProvider.
        when('/', {
            templateUrl: "components/app.html",
            controller: 'AppController',
            controllerAs: '$ctrl'
        }).
        otherwise({redirectTo: '/'});
}])
.run(['$templateCache', function ($templateCache) {
    $templateCache.put('components/app.html', html);
}]);

window.onload = function() {
    angular.bootstrap(document.getElementById('app'), ['perfTest']);
};

import './components/control-panel/control-panel';
import './components/ticker-list/price';
import './components/ticker-list/sector-name';
import './components/ticker-list/ticker-list';
import './components/ticker-list/ticker-tile';
import './components/ticker-list/ticker-count';
import './components/ticker-list/volume';
import './components/ticker-list/sma';

import './services/controlPanelService';
import './services/actionSimulator';
import './services/tickerDataService';
import './services/serverDataManager';
import './services/simulatedActions';

import './config/config';

import './components/app';