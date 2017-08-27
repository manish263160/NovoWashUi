app
  .controller("customertestinomial",
  function ($scope, $http, $rootScope, $timeout) {

    $scope.number4 = [
      { img: 'assets/cus_review_img/rakesh_thakur.jpg' ,label: 'Home Deep cleaning', cus_name:'Rakesh Thakur', review :'Thank you Novowash team for a very professional home cleaning service.  My house is cleaned better than my expectations.' }, 
      { img: 'assets/cus_review_img/arti_bahal.jpg' ,label: 'Home Deep cleaning', cus_name:'Arti Bahal', review :"Definitely recommending Novowash to my friends and relatives. Very professional and courteous staff with new technology equipments." },
      {img: 'assets/cus_review_img/anmal_kohli.jpg' ,label: 'Car Cleaning', cus_name:'Anmal Kohli', review :'Loved your car interior care service. Had never seen steam technology based cleaning earlier. I am definitely interested in your car cleaning packages' },
      {img: 'assets/cus_review_img/shruti_arora.JPG' ,label: 'Car Package', cus_name:'Shruti Arora', review :'I have been a Novowash customer since a past few months. What I like most about them is their quality of service and the time each professional gives to ensure that the car is cleaned in a very detailed manner.  Keep it up!' },
      {img: 'assets/cus_review_img/meenu_jain.jpg' ,label: 'Sofa Cleaning', cus_name:'Meenu Jain', review :'I was looking to give my couch a brand new look and you guys did just that! Keep up the excellent work!' },
    ];
    $scope.slickConfig4Loaded = true;
    /* $scope.updateNumber4 = function () {
      $scope.slickConfig4Loaded = false;
      $scope.number4[2].label = 123;
      $scope.number4.push({label: Math.floor((Math.random() * 10) + 100)});
      $timeout(function () {
        $scope.slickConfig4Loaded = true;
      });
    }; */
    $scope.slickConfig4 = {
      method: {},
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll:1,
      centerMode: true,
      variableWidth: true
    };


  });