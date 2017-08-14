  var app = angular.module('app', ['NVConfig', 'ui.router', 'duScroll', 'ngMaterial',
    'ngResource',
    'ngStorage', 'angular.filter','ngAnimate' , 'ngMaterialDatePicker' ,'ngValidate'
  ]);

  app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('altTheme')
    .primaryPalette('purple')

  }) 

  app.config(function ($validatorProvider) {
        $validatorProvider.setDefaults({
            errorElement: 'div',
            errorLabelContainer: '.customerror'
        });
    });

  app.config(function ($provide) {

  $provide.decorator('$exceptionHandler', function ($delegate) {

    return function (exception, cause) {
      $delegate(exception, cause);

      alert('There is something wrong, please try again.');
    };
  });
});