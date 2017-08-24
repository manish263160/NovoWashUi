app.controller("aboutusController",
  function ($scope, $http, $rootScope, $timeout) {

    $rootScope.active = "aboutus";
    $scope.teamList = [
      { logo_img: 'assets/img/team/1.jpg',name:"Rohan Deshmukh", pos:"Founder", qual:"IIT Bombay" },
      { logo_img: 'assets/img/team/2.jpg',name:"Anudeep Jain", pos:"Founder", qual:"CA,CFA" },
      { logo_img: 'assets/img/team/3.jpg' ,name:"Sandeep Supal", pos:"Tech(Consultant)", qual:"IIT Guwahati" },
      { logo_img: 'assets/img/team/4.jpg' ,name:"Swayam Subhra", pos:"Technology", qual:"BTech CS" },
      { logo_img: 'assets/img/team/5.jpg' ,name:"Aman Jingalia", pos:"Operations", qual:"BCom" },
    ];
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