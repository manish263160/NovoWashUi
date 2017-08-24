app.controller("aboutusController",
  function ($scope, $http, $rootScope, $timeout) {

    $rootScope.active = "aboutus";
    $scope.team1 =  { logo_img: 'assets/img/team/1.jpg',name:"Rohan Deshmukh", pos:"Founder", qual:"IIT Bombay" };
    $scope.team2 = { logo_img: 'assets/img/team/2.jpg',name:"Anudeep Jain", pos:"Founder", qual:"CA,CFA" }
    $scope.slickConfig4Loaded = true;


    $scope.slickCarausel = {
      method: {},
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  });