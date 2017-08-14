'use strict';

app.
controller('serviceForm', function($scope, $http ,mdcDateTimeDialog , $rootScope ,RootAPIServices) {
        var vm = this;
        $scope.projectForm = {};

        vm.location=['East delhi','West delhi','North delhi','South Delhi'];
        $scope.date = moment().startOf('day');
        $scope.minDate = moment().subtract(3, 'year');
      $scope.maxDate = moment().add(3, 'year');

       $scope.displayDialogEdit = function () {
        mdcDateTimeDialog.show({
          currentDate: $scope.dateTimeEdit || moment().startOf('day'),
          maxDate: $scope.maxDate,
          showTodaysDate: '',
          time: true
        })
          .then(function (date) {
        //           $scope.projectForm.push
            vm.projectForm.serviceDate = date;
          }, function(){});
      };

        vm.progressbar=0;
        vm.pagecount=1;
        vm.servicesCost=[];
        $scope.init=function(){
                $scope =$scope.$parent;
                console.log("--data here--",$scope);
                console.log("--data servicesCost--",$scope.serviceCost)

                $scope.serviceCost.forEach(function(element) {
                        console.log(element.price);
                }, this);
                if($scope.categoryServiceData.serviceType ===1){
                        $scope.stepCount= 4;
                }
                else if($scope.categoryServiceData.serviceType ===0){
                        $scope.stepCount= 1;
                }

                console.log("initial page count==", vm.pagecount);
        }


         vm.actionButtonClick = function (pagecount , form) {
                 console.log("pagecount===",pagecount);
                 if(form.validate()) {
        // Form is valid! 
                        console.log("trueeeeeeeeeeeeee");
                        
                 pagecount--;
                 
                 
                 var perc=pagecount*100/ $scope.stepCount;
                        console.log("click happened",perc);
                        vm.progressbar=perc;
                 }else{
                         vm.pagecount--;
                                form.validate();
                                return false;
                        }
      };
                
               /*  vm.backButtonClick = function (pagecount){
                        console.log("click pagecount",pagecount);
                        var perc=pagecount*100/ $scope.stepCount;
                        pagecount--;
                        vm.progressbar=perc;
                        console.log("click perc",perc);
                }; */
                $scope.serviceFormSubmit=function(){
                                
                                 var enquire={};
                        
                                enquire.serviceId = $scope.categoryServiceData.id,
                                enquire.serviceCostId = vm.projectForm.serviceCostId,
                                enquire.house = vm.projectForm.house,
                                enquire.landmark= vm.projectForm.landmark,
                                enquire.locality= vm.projectForm.locality,
                                enquire.name= vm.projectForm.name,
                                enquire.phone= vm.projectForm.phone,
                                enquire.email= vm.projectForm.email,
                                enquire.serviceDate=vm.projectForm.serviceDate;
                        // enquire.push(data);
                         console.log("submit click",enquire);
                         RootAPIServices.rootApi.bookOrEnquireService({},enquire).$promise.then(function (response) {

                                console.log("result===",response);
                                vm.pagecount++;
                                console.log("pagecount after submit===",vm.pagecount);
                                vm.progressbar=100;
                         });

                }

        $scope.init();

$scope.validationOptions = {
    rules: {
        serviceCostId: {
            required: true,
        },
        serviceDate: {
            required: true,
            minlength: 6
        }
    },
    messages: {
        
    }
}
        
});