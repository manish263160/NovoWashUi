  var app = angular.module('app', ['NVConfig', 'ui.router', 'duScroll', 'ngMaterial',
    'ngResource',
    'ngStorage', 'angular.filter',
  ]);

  app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('red')
      .primaryPalette('red');

    $mdThemingProvider.theme('blue')
      .primaryPalette('blue');

  })