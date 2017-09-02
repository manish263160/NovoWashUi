

app
.controller("enqueryUserListController",
function ($scope, $http, $rootScope, $filter, NgTableParams, $document, RootAPIServices,Utils) {

    /*$scope.users = [{"id":1,"first_name":"Philip","last_name":"Kim","email":"pkim0@mediafire.com","country":"Indonesia","ip_address":"29.107.35.8"},
    {"id":2,"first_name":"Judith","last_name":"Austin","email":"jaustin1@mapquest.com","country":"China","ip_address":"173.65.94.30"},
    {"id":3,"first_name":"Julie","last_name":"Wells","email":"jwells2@illinois.edu","country":"Finland","ip_address":"9.100.80.145"},
    {"id":4,"first_name":"Gloria","last_name":"Greene","email":"ggreene3@blogs.com","country":"Indonesia","ip_address":"69.115.85.157"},
    
    {"id":50,"first_name":"Andrea","last_name":"Greene","email":"agreene4@fda.gov","country":"Russia","ip_address":"128.72.13.52"}];
*/

RootAPIServices.rootApi.getAllBooking({}).$promise.then(function (response) {
                                $scope.users=response.data;
                                // console.log("result===",$scope.users);
                            $scope.usersTable = new NgTableParams({} , { dataset:  $scope.users});
                         });
   
});

