'use strict';
app.controller('becomepartner', function ($scope, $http, $rootScope, RootAPIServices,$mdDialog, $timeout) {
  $rootScope.active = "becompartner";
   $scope.form = {};
   $scope.partner = {};
   $scope.response = {"isSuccess": false};

  //  console.log('---',$rootScope.active);
  $scope.becomePartner = function (ev) {
    var body = $scope.partner;
    RootAPIServices.rootApi.becomePartnerService({}, body).$promise.then(function (response) {
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

      $scope.form.partnerForm.$setPristine();
      $scope.form.partnerForm.$setUntouched();
   
    });
  }

});
