app.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when("", "/home");
  var header = {
    templateUrl: "app/partials/header.html",
    controller: function ($scope,$window) { 
     /*  $scope.ulshow=false;

      $scope.myFunction=function(){
        $scope.ulshow=!$scope.ulshow;
      } */
      $scope.ismobileview=false;
      if($window.innerWidth <= 768){
        // $scope.isdesktop=false;
        $scope.ismobileview=true;
      }

    }

  }
  var footer = {
    templateUrl: "app/partials/footer.html",
    controller: function ($scope, $document,$state , $window) {
      $scope.toTheTop = function () {
        $document.scrollTopAnimated(0, 500).then(function () {
          // console.log('You just scrolled to the top!');
        });
      }

      $scope.ismobileview=false;
      if($window.innerWidth <= 768){
        // $scope.isdesktop=false;
        $scope.ismobileview=true;
      }
      $scope.goTofaq = function()
      {
        // console.log('reload');
        // $state.reload();
        $state.go("faq",{},{reload:'faq'})
      }
    }

  }

  $stateProvider
    .state('home', {
      url: "/home",
      views: {
        header: header,
        content: {
          templateUrl: "app/components/homesection/homesection.html",
          controller: 'headerController'
        },
        footer: footer
      },
    })

    /*  .state('home.service', {
       url: '/services',
       views: {
         'service': {
           templateUrl: 'app/components/servicesection/services.html',
           controller: 'serviceSectionController'
         }
       },
     }) */

    .state('aboutus', {
      url: "/aboutus",
      views: {
        header: header,
        content: {
          templateUrl: "app/components/aboutusSection/aboutus.html",
          controller: 'aboutusController',
        },
        footer: footer
      },
    })
    .state('becomepartner', {
      url: "/becomepartner",
      views: {
        header: header,
        content: {
          templateUrl: "app/components/partner/add_partner.html",
          controller: 'becomepartner',
        },
        footer: footer
      },
    })
    .state('faq', {
      url: "/faq",
      views: {
        header: header,
        content: {
          templateUrl: "app/partials/faq.html",
          // controller: 'becomepartner',
        },
        footer: footer
      },
    })
    .state('privacy', {
      url: "/privacy",
      views: {
        header: header,
        content: {
          templateUrl: "app/partials/privacy.html",
          // controller: 'becomepartner',
        },
        footer: footer
      },
    })
    .state('terms', {
      url: "/terms",
      views: {
        header: header,
        content: {
          templateUrl: "app/partials/terms.html",
          // controller: 'becomepartner',
        },
        footer: footer
      },
    })
    .state('allEnqueryforNovoWash', {
      url: "/allEnqueryforNovoWash",
      views: {
        // header: header,
        content: {
          templateUrl: "app/allEnquery/enqueryUserList.html",
          controller: 'enqueryUserListController',
        },
        // footer: footer
      },
    })
});