app
.controller("partnerController",
function ($scope, $http, $rootScope, $timeout){

    $scope.logoJson=[
        {logo_img:'assets/partner_img/godrej.png'},
        {logo_img:'assets/partner_img/hicare_logo.png'},
        {logo_img:'assets/partner_img/homecenter.png'},
        {logo_img:'assets/partner_img/parwanath.png'},
        {logo_img:'assets/partner_img/rentickle.png'},
        // {logo_img:'assets/partner_img/sandoz.png'},
        {logo_img:'assets/partner_img/uclean.png'},
        {logo_img:'assets/partner_img/urbanclap.png'},
        {logo_img:'assets/partner_img/Zommber.png'},
    ] ;
    $scope.slickConfig4Loaded = true;


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