  var app = angular.module('app', ['NVConfig', 'ui.router', 'duScroll', 'ngMaterial',
    'ngResource','ngMessages','slickCarousel','ngTable', 
    'ngStorage', 'angular.filter','ngAnimate' , 'ngMaterialDatePicker' ,'ngAria',
  ]);

  app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('altTheme')
    .primaryPalette('purple')

  });
  
  app.config(['slickCarouselConfig', function (slickCarouselConfig) {
    slickCarouselConfig.dots = true;
    slickCarouselConfig.autoplay = false;
  }]);
  /* app.config(function ($validatorProvider) {
        $validatorProvider.setDefaults({
            errorElement: 'div',
            // errorLabelContainer: '.customerror'
            errorPlacement: function(error, element) {
              console.log("element===",element,"  ",element['0'].type);
             element['0'].type;
             if(element['0'].type === 'radio' || element['0'].type==='date'){
              error.appendTo('.customerror');
             }else{
               error.appendTo('.text');
             }
          }
        });
    }); */

  app.config(function ($provide) {

  $provide.decorator('$exceptionHandler', function ($delegate) {

    return function (exception, cause) {
      $delegate(exception, cause);

     // alert('There is something wrong, please try again.');
    };
  });
});