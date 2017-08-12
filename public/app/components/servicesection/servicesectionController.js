'use strict';

app.
controller('serviceForm', function($scope, $http) {
        var vm = this;

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
        }


         vm.actionButtonClick = function (pagecount) {
                 console.log("pagecount===",pagecount);
                 pagecount--;
                 var perc=pagecount*100/ $scope.stepCount;
                        console.log("click happened",perc);
                        vm.progressbar=perc;
                 /* if(pagecount <= $scope.stepCount){
                        vm.pagecount++;
                        console.log("pagecount===",pagecount," ",$scope.stepCount);
                 }else{
                         
                 } */
      };
                vm.backButtonClick = function (pagecount){
                        var perc=pagecount*100/ $scope.stepCount;
                        console.log("click happened",perc);
                        vm.progressbar=perc;
                };

        $scope.init();
});