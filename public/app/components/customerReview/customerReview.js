app
  .controller("customertestinomial",
  function ($scope, $http, $rootScope, $timeout) {

    $scope.number4 = [
      { img: 'assets/cus_review_img/rakesh_thakur.jpg' ,label: 'Home Deep cleaning', cus_name:'Rakesh Thakur', review :'@Novowash Thank you! You more than lived up to your claims! My house is cleaned better than my expections. Keep it up :)' }, 
      { img: 'assets/cus_review_img/arti_bahal.jpg' ,label: 'Home Deep cleaning', cus_name:'Arti Bahal', review :"The house has become totally spic and span in just a few hours. I couldn't have imagined doing this all by myself with such good quality. Thanks Novowash!" },
      {img: 'assets/cus_review_img/anmal_kohli.jpg' ,label: 'Car Cleaning', cus_name:'Anmal Kohli', review :'You guys are brilliant! I would like to take your monthly interior care service.' },
      {img: 'assets/cus_review_img/shruti_arora.JPG' ,label: 'Car Package', cus_name:'Shruti Arora', review :'Excellent car cleaning service at door-step! Had never seen a car cleaned using steam technology. Keep up your good work!' },
      {img: 'assets/cus_review_img/meenu_jain.jpg' ,label: 'Sofa Cleaning', cus_name:'Meenu Jain', review :'I was really looking to give my couch a brand new look once again. And you guys did exaclty that for me!' },
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
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll:1,
      centerMode: true,
      variableWidth: true
    };


  });