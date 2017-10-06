
app
  .directive('serviceSection', function () {
    return ({
      restrict: 'E',
      transclude: 'true',
      templateUrl: 'app/components/servicesection/services.html',
      
      link: function (scope, element, attrs) {

      },
      controller: function ($scope, $http, $rootScope, $mdDialog, $interval, RootAPIServices ) {
        $scope.setActive = function () {
          $rootScope.active = "service";
        }
        // console.log('------------',$rootScope.active);
       
      },
       compile: function compile( tElement, tAttributes ) {
            // console.log( tAttributes.log + ' (compile)'  );
            return {
                pre: function preLink( scope, element, attributes ) {
                    // console.log( attributes.log + ' (pre-link)'  );
                },
                post: function postLink( scope, element, attributes ) {
                    // console.log( attributes.log + ' (post-link)'  );
                }
            };
         }
     
    });
  });


app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log,$mdDialog) {
  $scope.toggleLeft = buildDelayedToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.isOpenRight = function () {
    return $mdSidenav('right').isOpen();
  };

  /**
   * Supplies a function that will continue to operate until the
   * time is up.
   */
  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $scope,
        args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function () {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildDelayedToggler(navID) {
    return debounce(function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }

  function buildToggler(navID) {
    return function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    };
  }

})
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  })
 