app
  .controller("serviceSectionController",
    function ($scope,  $http ,$rootScope) {

        $rootScope.active="service";

        console.log('---',$rootScope.active);
}
  )