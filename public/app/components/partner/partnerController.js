'use strict';
app.controller('partnerController', function ($scope, $http, $rootScope, RootAPIServices,$mdDialog, $timeout) {
   $scope.partner = {};
   $scope.response = {"isSuccess": false};


  $scope.becomePartner = function (ev) {
    var body = $scope.partner;
    console.log("submit click", body);
    RootAPIServices.rootApi.becomePartnerService({}, body).$promise.then(function (response) {
      console.log("result===", response);
      $scope.response.isSuccess = true;
      $scope.partner = {};
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Thank you!')
          .textContent('Your request has been submitted.Our team will get back to you shortly.')
         // .htmlContent('Your request has been submitted.<br>Our team will get back to you shortly.')
          .ariaLabel('')
          .ok('Ok')
          .targetEvent(ev)
      );

      $scope.partnerForm.$setPristine();
      $scope.partnerForm.$setUntouched();
   
    });
  }

});