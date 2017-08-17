app.config(['slickCarouselConfig', function (slickCarouselConfig) {
    slickCarouselConfig.dots = true;
    slickCarouselConfig.autoplay = false;
  }])
  .controller("customertestinomial",
  function ($scope, $http, $rootScope, $timeout) {

   $scope.number4 = [{label: 200}, {label: 200}, {label: 200}, {label: 200}, {label: 200}, {label: 200}, {label: 200}, {label: 200}];
    $scope.slickConfig4Loaded = true;
    $scope.updateNumber4 = function () {
      $scope.slickConfig4Loaded = false;
      $scope.number4[2].label = 123;
      $scope.number4.push({label: Math.floor((Math.random() * 10) + 100)});
      $timeout(function () {
        $scope.slickConfig4Loaded = true;
      });
    };
    $scope.slickConfig4 = {
      method: {},
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true
    };

  });