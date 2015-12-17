var memoryApp = angular.module('memoryApp',['ngRoute'])
  .config(routeConfig);

function routeConfig($routeProvider) {
  $routeProvider

  .when('/game', {
    controller: 'gameCtrl as vm',
    templateUrl: 'game/game.html'
  });

  $routeProvider.otherwise({redirectTo: '/game'});
}

