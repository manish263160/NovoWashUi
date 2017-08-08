

app
  .controller("headerController",
  function ($scope, $http, $rootScope, $timeout, $document, $mdDialog, $interval, RootAPIServices,Utils) {

    $rootScope.active = "home";
    $scope.loaded = true;
    $scope.catModel = false;
    $scope.servModel = false;

    $scope.catId;
    console.log('---hi', $rootScope.active);

    $timeout(function () {
      // Simulates loading
      $scope.loaded = false;
    }, 500);


    $scope.init = function () {
     
    }
/* 
    $scope.theme = 'red';

    var isThemeRed = true;

    $interval(function () {
      $scope.theme = isThemeRed ? 'green' : 'red';

      isThemeRed = !isThemeRed;
    }, 2000);  */

     RootAPIServices.rootApi.getAllServiceCategories({}).$promise.then(function (response) {
        $scope.allcategory = response.data;
        $rootScope.allcategory = response.data;
      })

    $scope.showAdvanced = function (ev,catId) {
      
      console.log('catId===',catId);
      $rootScope.catId = catId;

       console.log('----===',$scope.catId);
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/components/servicesection/servicepopup.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        scope: $scope
      })
        .then(function (answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog, $rootScope) {
      console.log("-----dilog container", $rootScope.catId);
      $scope.catModel = true;
      var requestData = {};
      requestData.categoryId = $scope.catId
      console.log('parent====',$scope.allcategory);
      // $scope.allcategory= $rootScope.allcategory;
      // $scope.catId = $rootScope.catId;
      
        RootAPIServices.rootApi.getAllServiceByCatId(requestData,null).$promise.then(function (response) {
        $scope.allServices = response.data;
        console.log('========== service', $scope.allServices );
      }) 
      

      $scope.getServiceById =function getServiceById(event, catId){
        console.log('catId--',catId);
        $scope.catId=catId;
         RootAPIServices.rootApi.getAllServiceByCatId({categoryId:catId},null).$promise.then(function (response) {
        $scope.allServices = response.data;
        console.log('========== getServiceById.allServices', $scope.allServices );

      }) 
      }

      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function ($event) {
        console.log("close is clicked");
        $mdDialog.cancel();
        $event.stopPropagation()
      };

      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };

    }


      $scope.goToServiceForm = function (id, event) {
        console.log("---",id);
        $scope.servModel = true;
        $mdDialog.show({
        controller: DialogControllerServ,
        templateUrl: 'app/components/servicesection/serviceForm.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        scope :$scope
      });
      };


    function DialogControllerServ($scope, $mdDialog, $rootScope) {
      var requestData = {};
      
      

      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
    }


    $scope.init();
  }).value('duScrollOffset', 30);
