

app
  .controller("headerController",
  function ($scope, $http,$window, $rootScope, $timeout, $document, $mdDialog, $interval, RootAPIServices,Utils) {


    
    $rootScope.active = "home";
    $scope.frameHeight = window.innerHeight;
    $scope.loaded = true;
    $scope.catModel = false;
    $scope.servModel = false;
    $scope.sticky =false;
    $scope.infografix=[
      {value:'0',text:'WORKING HOURS',max:'10000', type:'+' , icon:'query_builder'},
      {value:'0',text:'HAPPY CUSTOMERS',max:'1500' , type:'+',icon:'favorite_border'},
      // {value:'0',text:'VERIFIED EXPERTS',max:'99'},
      {value:'0',text:'POSITIVE FEEDBACK',max:'99' , type:'%',icon:'star_rate'},
    ]
    $document.on('scroll', function() {
      // console.log('Document scrolled to ', $document.scrollLeft(), $document.scrollTop());
      var topheight=$document.scrollTop();
      if(topheight > 0){
        // console.log("topheight true")
        $('#header').addClass('sticky');
      }
      if(topheight >= 1500){
        $timeout($scope.onTimeout,200);
      }else{
        $scope.infografix=[
          {value:'0',text:'WORKING HOURS',max:'10000', type:'+' , icon:'query_builder'},
          {value:'0',text:'HAPPY CUSTOMERS',max:'1500' , type:'+',icon:'favorite_border'},
          // {value:'0',text:'VERIFIED EXPERTS',max:'99'},
          {value:'0',text:'POSITIVE FEEDBACK',max:'99' , type:'%',icon:'star_rate'},
        ]
      }
    });
    $scope.onTimeout = function(){
      $scope.infografix.forEach(function(e) {
        var store=e.value;
         if (e.value < e.max) {
            e.value++;
            mytimeout = $timeout($scope.onTimeout,200);
        } else{
          e.value = e.max;
        }
      }, this);
  }

    $scope.catId;

    $timeout(function () {
      // Simulates loading
      $scope.loaded = false;
    }, 500);


    $scope.init = function () {
     
      // $scope.isdesktop=true;
      $rootScope.ismobileview=false;
      if($window.innerWidth <= 768){
        // $scope.isdesktop=false;
        $rootScope.ismobileview=true;
      }
      
      $scope.isdesktop=true;
      
      if($window.innerWidth <= 768){
        $scope.isdesktop=false;
      }
      $scope.serviceSection=false;
      $scope.showHeader=false;
      
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
      // console.log("catId in showAdvanced mehod====",catId);
       if(catId == undefined || catId == null){
         catId = 1;
         $scope.isCatShow=true;
       }else{
        $scope.isCatShow=false;
      $rootScope.catId = catId;
       $scope.catId=catId;
       }
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
          $("#viewAll").click();
        });
    };

    function DialogController($scope, $mdDialog, $rootScope ,$window ,$mdSidenav, $log) {

      $scope.catModel = true;
      var requestData = {};
      if($scope.catId != undefined || $scope.catId != null){

      requestData.categoryId = $scope.catId
      }else{
        requestData.categoryId =1;
        $scope.catId=1;
      }

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
        // console.log('catId--',catId);
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
        // console.log("-serviceid--",item.id);
        $scope.categoryServiceData=item;
        $scope.servModel = true;
        var serviceId =$scope.categoryServiceData.id;
        RootAPIServices.rootApi.getServicesCostById({serviceId:serviceId},null).$promise.then(function (response) {
        $scope.serviceCost=response.data;
        // console.log("---cost--",response.data)
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
      // console.log("$scope.categoryServiceData===",$scope.categoryServiceData);
      
      


      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function ($event) {
        $mdDialog.cancel();
        // console.log("---$rootScope.catId---",$rootScope.catId);
        $scope.showAdvanced($event,$rootScope.catId);
      };

     
    }


    $scope.init();
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */

/* start of mobile site */




  }).value('duScrollOffset', 30);
