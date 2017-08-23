app
.controller("partnerController",
function ($scope, $http, $rootScope, $timeout){

    $scope.logoJson=[
        {logo_img:'assets/partner_img/godrej.png'},
        {logo_img:'assets/partner_img/homecenter.jpg'},
        {logo_img:'assets/partner_img/ola.jpg'},
        {logo_img:'assets/partner_img/parwanath.jpg'},
        {logo_img:'assets/partner_img/renticle.jpg'},
        {logo_img:'assets/partner_img/sandoz.jpg'},
        {logo_img:'assets/partner_img/u_logo.png'},
        {logo_img:'assets/partner_img/urbanclap.png'},
        {logo_img:'assets/partner_img/zimmber.png'},
    ] ;
    $scope.slickConfig4Loaded = true;


    $scope.slickCarausel = {
        method: {},
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll:1,
        centerMode: true,
        variableWidth: false
      };
});