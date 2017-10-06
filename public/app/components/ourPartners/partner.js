app
.controller("partnerController",
function ($scope, $http, $rootScope, $timeout ,$window){

    $scope.logoJson=[
        {logo_img:'assets/partner_img/godrej.png', com_name:'Godrej Group'},
        {logo_img:'assets/partner_img/hicare_logo.png', com_name:'Hicare services pvt ltd'},
        {logo_img:'assets/partner_img/homecenter.png', com_name:'Home Centre Stores'},
        {logo_img:'assets/partner_img/parwanath.png', com_name:'Parshwanath Housing Finance'},
        {logo_img:'assets/partner_img/rentickle.png', com_name:'Rentickle'},
        // {logo_img:'assets/partner_img/sandoz.png'},
        {logo_img:'assets/partner_img/uclean.png', com_name:'U clean Technology'},
        {logo_img:'assets/partner_img/urbanclap.png', com_name:'UrbanClap Technologies India Pvt. Ltd '},
        {logo_img:'assets/partner_img/Zommber.png', com_name:'Zimmber'},
    ] ;
    $scope.slickConfig4Loaded = true;

	$scope.isMobileView = false;
	if ($window.innerWidth <= 768) {
		$scope.isMobileView = true;
	}

	// console.log("$scope.isMobileView==in partner====",$scope.isMobileView)
    /* $scope.slickCarausel = {
        method: {},
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll:1,
        centerMode: true,
        variableWidth: false
      }; */
     

}).directive("owlCarousel", function() {
	return {
		restrict: 'E',
		transclude: false,
		link: function (scope) {
			scope.initCarousel = function(element) {
			  // provide any default options you want
				var defaultOptions = {
				};
				var customOptions = scope.$eval($(element).attr('data-options'));
				// combine the two options objects
				for(var key in customOptions) {
					defaultOptions[key] = customOptions[key];
				}
				// init carousel
				var curOwl = $(element).data('owlCarousel');
				if(!angular.isDefined(curOwl)) {
  				$(element).owlCarousel(defaultOptions);
				}
				scope.cnt++;
			};
		}
	};
})
.directive('owlCarouselItem', [function() {
	return {
		restrict: 'A',
		transclude: false,
		link: function(scope, element) {
		  // wait for the last item in the ng-repeat then call init
			if(scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
}]);
;