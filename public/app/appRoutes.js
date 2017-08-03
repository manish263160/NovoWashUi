

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when("", "/home");
  var header = {
    templateUrl: "app/partials/header.html",
    controller: function ($scope) { }

  }
  var footer = {
    templateUrl: "app/partials/footer.html",
    controller: function ($scope, $document) {
      $scope.toTheTop = function () {
        $document.scrollTopAnimated(0, 500).then(function () {
          console.log('You just scrolled to the top!');
        });
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

    .state('home.service', {
      url: '/services',
      views: {
        'service': {
          templateUrl: 'app/components/servicesection/services.html',
          controller: 'serviceSectionController'
        }
      },
    })

    .state('aboutus', {
      url: "/aboutus",
      views: {
        header: header,
        content: {
          templateUrl: "app/components/whyusSection/aboutus.html",
          controller: 'aboutusController',
        },
        footer: footer
      },
    })

});