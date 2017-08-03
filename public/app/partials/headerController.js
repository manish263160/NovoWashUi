app
  .controller("headerController",
    function ($scope,  $http ,$rootScope ,$timeout, $document) {

        $rootScope.active="home";
        $scope.loaded = true;
        console.log('---hi',$rootScope.active);

         $timeout(function() {
        // Simulates loading
        $scope.loaded = false;
      }, 500);

}
  ).value('duScrollOffset', 30);
