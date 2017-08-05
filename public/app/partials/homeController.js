app.config(function ($provide) {

  $provide.decorator('$exceptionHandler', function ($delegate) {

    return function (exception, cause) {
      $delegate(exception, cause);

      alert('There is some error please try again.');
    };
  });
});

app
  .controller("headerController",
  function ($scope, $http, $rootScope, $timeout, $document, $mdDialog, $interval) {

    $rootScope.active = "home";
    $scope.loaded = true;
    console.log('---hi', $rootScope.active);

    $timeout(function () {
      // Simulates loading
      $scope.loaded = false;
    }, 500);


    $scope.init = function () {
      // We extend jQuery by method hasAttr
      /* $.fn.hasAttr = function(name) {
        return this.attr(name) !== undefined;
      };
    
    
      // Equal Height Columns
      function handleEqualHeightColumns() {
        var EqualHeightColumns = function () {
          $('.equal-height-row').each(function() {
            heights = [];
            $('.equal-height-column', this).each(function() {
              $(this).removeAttr('style');
              heights.push($(this).height()); // Write column's heights to the array
            });
            $('.equal-height-column', this).height(Math.max.apply(Math, heights)); // Find and set max
          });
        }
    
        EqualHeightColumns();
        $(window).resize(function() {
          EqualHeightColumns();
        });
        $(window).load(function() {
          EqualHeightColumns();
        });
      }
      return {
        init: function() {
          handleEqualHeightColumns();
        }
      }; */
    }

    $scope.theme = 'red';

    var isThemeRed = true;

    $interval(function () {
      $scope.theme = isThemeRed ? 'green' : 'red';

      isThemeRed = !isThemeRed;
    }, 2000);

    $scope.showAdvanced = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/components/servicesection/servicepopup.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      })
        .then(function (answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog, RootAPIServices) {
      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };


      RootAPIServices.rootApi.getAllServiceCategories({}).$promise.then(function (response) {
        console.log('==========', response);
        $scope.allcategory = response.data;
      })
    }


    $scope.init();
  }).value('duScrollOffset', 30);
