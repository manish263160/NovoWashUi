

app
  .controller("headerController",
  function ($scope, $http, $rootScope, $timeout, $document, $mdDialog, $interval, RootAPIServices,Utils) {

    $rootScope.active = "home";
    $scope.loaded = true;
    $scope.catModel = false;
    $scope.servModel = false;

    $scope.catId;

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

    $scope.showAdvanced = function (event,catId) {
       if(catId == undefined || catId == null){
         catId = 1;
         $scope.isCatShow=true;
       }else{
        $scope.isCatShow=false;
       }
      $rootScope.catId = catId;
       $scope.catId=catId;
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/components/servicesection/servicepopup.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        scope: $scope.$new()
      })
        .then(function (answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog, $rootScope) {
      $scope.catModel = true;
      var requestData = {};
      requestData.categoryId = $scope.catId

      var isCatShow =$scope.isCatShow;
      $scope.allcategory.forEach(function (data) {
        if(data.id === $scope.catId){
          if(!$scope.isCatShow){
          $scope.unitCatName=data.catName;
          }
        }

      });
      // $scope.allcategory= $rootScope.allcategory;
      // $scope.catId = $rootScope.catId;
      
        RootAPIServices.rootApi.getAllServiceByCatId(requestData,null).$promise.then(function (response) {
        $scope.allServices = response.data;
      }) 
      

      $scope.getServiceById =function getServiceById(event, catId){
        console.log('catId--',catId);
        $scope.catId=catId;
         RootAPIServices.rootApi.getAllServiceByCatId({categoryId:catId},null).$promise.then(function (response) {
        $scope.allServices = response.data;

      }) 
      }

      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function ($event) {
        $mdDialog.cancel();
        
      };

    }


      $scope.goToServiceForm = function (item, $event) {
        console.log("-serviceid--",item.id);
        $scope.categoryServiceData=item;
        $scope.servModel = true;
        var serviceId =$scope.categoryServiceData.id;
        RootAPIServices.rootApi.getServicesCostById({serviceId:serviceId},null).$promise.then(function (response) {
        $scope.serviceCost=response.data;
        console.log("---cost--",response.data)
        $mdDialog.show({
        controller: DialogControllerServ,
        templateUrl: 'app/components/servicesection/serviceForm.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: false,
        scope: $scope.$new()
      });

      }) 
      };


    function DialogControllerServ($scope, $mdDialog, $rootScope) {
      var requestData = {};
      // $scope.serviceCatId=serviceCatId;
      //   $scope.serviceId=item.id;
      angular.extend($scope,{
          categoryServiceData : $scope.categoryServiceData,
      });
      console.log("$scope.categoryServiceData===",$scope.categoryServiceData);
      
      


      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function ($event) {
        $mdDialog.cancel();
        console.log("---$scope.catId---",$scope.catId);
        $scope.showAdvanced($event,$scope.catId);
      };

     
    }


    $scope.init();
  }).value('duScrollOffset', 30);
