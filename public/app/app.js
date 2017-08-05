var app = angular.module('app', ['NVConfig','ui.router','duScroll','ngMaterial']);

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('red')
      .primaryPalette('red');

    $mdThemingProvider.theme('blue')
      .primaryPalette('blue');

  })