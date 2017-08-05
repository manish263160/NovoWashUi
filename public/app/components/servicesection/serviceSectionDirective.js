
app
  .directive('serviceSection', function () {
    return ({
      restrict: 'E',
      transclude: 'true',
      templateUrl: 'app/components/servicesection/services.html',

      controller: function ($scope, $http, $rootScope, $mdDialog, $interval) {

       
        $scope.setActive =function(){
        $rootScope.active = "service";
        }
        
      }

    });
  });
