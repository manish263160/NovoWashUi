app
  .controller("aboutusController",
    function ($scope,  $http ,$rootScope) {

        $rootScope.active="aboutus";

        console.log('---',$rootScope.active);
}
  )