/*app
  .controller("partnerController",
  function ($scope, $http, $rootScope) {

    $rootScope.active = "become_partner";

    console.log('---', $rootScope.active);
  }
  )*/

/*app.module('myApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages'])*/

app.controller('partnerController', function ($scope, $http, $rootScope) {
    $scope.submit = function () {
      // submit code goes here
    };
    $scope.reset = function () {
      /* $scope.obj = {
         name: "",
         myselect: "",
         status: ""
       }*/
    }
    $scope.reset();
  });
