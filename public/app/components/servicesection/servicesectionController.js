'use strict';

app.
controller('serviceForm', function($scope, $http ,mdcDateTimeDialog , $rootScope ,RootAPIServices) {
        var vm = this;
        $scope.parent =$scope.$parent;
        $scope.myForm ={};

        $scope.location=['East delhi','West delhi','North delhi','South Delhi'];
        $scope.date = moment().startOf('day');
        $scope.minDate = new Date();
        $scope.maxDate = moment().add(1, 'year');
        //$scope.disableDates = 

       $scope.displayDialogEdit = function (form) {
        mdcDateTimeDialog.show({
          currentDate: $scope.dateTimeEdit || moment().startOf('day'),
          maxDate: $scope.maxDate,
          showTodaysDate: '',
          time: true,
          minDate:$scope.minDate
        })
          .then(function (date) {
        //           $scope.projectForm.push
            $scope.myForm.serviceDate = date;
            $("#datetimeedit-error").hide();
          }, function(){});
      };

        
        $scope.progressbar=0;
        $scope.servicesCost=[];
        $scope.init=function(){
                $scope.pagecount=1;
                
                console.log("--data here--",$scope.parent);
                console.log("--data servicesCost--",$scope.parent.serviceCost)

                $scope.parent.serviceCost.forEach(function(element) {
                        console.log(element.price);
                }, this);
                if($scope.parent.categoryServiceData.serviceType ===1){
                        $scope.stepCount= 4;
                }
                else if($scope.parent.categoryServiceData.serviceType ===0){
                        $scope.stepCount= 1;
                }

                console.log("initial page count==", $scope.pagecount);
        }


         $scope.actionButtonClick = function (pagecount , form) {
                console.log("-------------------",$scope.projectForm.$valid);
                if($scope.projectForm.$valid){
                 console.log("pagecount===",pagecount);
                 $scope.pagecount=pagecount;
                 pagecount--;
                 var perc=pagecount*100/ $scope.stepCount;
                        console.log("click happened",perc);
                        $scope.progressbar=perc;
                        $scope.myVar = true;
                }else{
                         $scope.myVar = false;
                }
                 /* if(form.validate()) {
        // Form is valid! 
                console.log("trueeeeeeeeeeeeee");
                 }else{
                         $scope.pagecount--;
                                form.validate();
                                return false;
                        } */
      };
                
          $scope.backButtonClick = function (pagecount){
                        console.log("click pagecount",pagecount);
                        $scope.pagecount=pagecount;
                        pagecount--;
                        var perc=pagecount*100/ $scope.stepCount;
                        $scope.progressbar=perc;
                        console.log("click perc",perc);
                        // $scope.pagecount--;
        };

                $scope.serviceFormSubmit=function(){
                                
                                 var enquire={};
                        
                                enquire.serviceId = $scope.categoryServiceData.id,
                                enquire.serviceCostId = $scope.myForm.serviceCostId,
                                enquire.house = $scope.myForm.house,
                                enquire.landmark= $scope.myForm.landmark,
                                enquire.locality= $scope.myForm.locality,
                                enquire.name= $scope.myForm.name,
                                enquire.phone= $scope.myForm.phone,
                                enquire.email= $scope.myForm.email,
                                enquire.serviceDate= $scope.myForm.serviceDate;
                        // enquire.push(data);
                         console.log("submit click",enquire);
                         RootAPIServices.rootApi.bookOrEnquireService({},enquire).$promise.then(function (response) {

                                console.log("result===",response);
                                $scope.pagecount++;
                                console.log("pagecount after submit===",$scope.pagecount);
                                $scope.progressbar=100;
                         });

                }

        $scope.init();

/* $scope.validationOptions = {
    rules: {
        serviceCostId: {
            required: true,
        },
        serviceDate: {
            required: true,
        }, 
        house:{
        required: true,
        },
        landmark:{
                required: true,
        },
        locality:{
                required: true,
        }
        
    },
    messages: {
        
    }
} */
        
});