

app
.controller("enqueryUserListController",
function ($scope, $http, $rootScope, $filter, NgTableParams, $document, RootAPIServices,Utils) {

    /*$scope.users = [{"id":1,"first_name":"Philip","last_name":"Kim","email":"pkim0@mediafire.com","country":"Indonesia","ip_address":"29.107.35.8"},
    {"id":2,"first_name":"Judith","last_name":"Austin","email":"jaustin1@mapquest.com","country":"China","ip_address":"173.65.94.30"},
    {"id":3,"first_name":"Julie","last_name":"Wells","email":"jwells2@illinois.edu","country":"Finland","ip_address":"9.100.80.145"},
    {"id":4,"first_name":"Gloria","last_name":"Greene","email":"ggreene3@blogs.com","country":"Indonesia","ip_address":"69.115.85.157"},
    
    {"id":50,"first_name":"Andrea","last_name":"Greene","email":"agreene4@fda.gov","country":"Russia","ip_address":"128.72.13.52"}];
*/

RootAPIServices.rootApi.getAllBooking({}).$promise.then(function (response) {
                                $scope.users=response.data;
                                // console.log("result===",$scope.users);
                            $scope.usersTable = new NgTableParams({} , { dataset:  $scope.users});
                         });
   
});


app.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '0.2s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var target = document.querySelector(attrs.slideToggle);
            attrs.expanded = false;
            element.bind('click', function() {
                var content = target.querySelector('.slideable_content');
                if(!attrs.expanded) {
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    var y = content.clientHeight;
                    content.style.border = 0;
                    target.style.height = y + 'px';
                } else {
                    target.style.height = '0px';
                }
                attrs.expanded = !attrs.expanded;
            });
        }
    }
});

app.service('userAPI', function ($rootScope, $q, $http, $state, $interval, RootAPIServices, Utils,$localStorage, KSConfig) {

});
app.factory('RootAPIServices', function ($resource, $localStorage, $rootScope, NVConfig) {

  var rootURL = NVConfig.webservice_domain;

  function checkAndSendResponse(response, headersGetter) {
    var responseJSON = angular.fromJson(response);
    if (responseJSON && responseJSON.result) {
      return responseJSON.data;
    }
    // insert error handling??
  };

  function checkResponse(response, headersGetter) {
    var responseJSON = angular.fromJson(response);
    if (responseJSON && responseJSON.result) {
      return true;
    } else {
      return false;
    }
    // insert error handling??
  };

  function defaultTransformResponse(response) {
    return angular.fromJson(response);
  }

  function refreshPublishedQuestionnaire(response) {
    /* if(response && response.result) {
      $rootScope.getPublishedQuestionnaire_requiresUpdate = 'RequiresCacheRefresh';
    } */
    return response;
  }
  return {
    rootApi:
    $resource(rootURL + '/services', {}, {
      getAllServiceCategories: {
        url: rootURL + '/services/get/category',
        method: 'POST',
        transformResponse: defaultTransformResponse
      },

      getAllServiceByCatId: {
        url: rootURL + '/services/get/:categoryId',
        method: 'POST',
      },

      getServicesCostById: {
        url: rootURL + '/services/get/cost/:serviceId',
        method: 'POST',
      },

      bookOrEnquireService: {
        url: rootURL + '/services/book/:enquire',
        method: 'POST',
      },

      becomePartnerService : {
        url:rootURL + '/partner/add',
        method: 'POST'
      },
      getAllBooking : {
        url:rootURL + '/booking/getAll',
        method: 'POST'
      },
    })

  }

});
app.service('Utils', function() {

    var allcategory =[];

    this.allcategory = function (active) {
        RootAPIServices.rootApi.getAllServiceCategories({}).$promise.then(function (response) {
        return response.data;
      })
    }


    this.getDateFromString= function(dateString, format) {

      return new Date(dateString);
      /*if (dateString ) {
        if (dateString != 'N/A') {
          if (!format) {
            format = 'MMM Do YYYY';
          }
          var formattedDate = moment.utc(dateString, "MM/DD/YYYY hh:mm:ss a").local().format(format);

          return formattedDate;
        } else {
          return dateString;
        }
      }*/
    }
});
  var app = angular.module('app', ['NVConfig', 'ui.router', 'duScroll', 'ngMaterial',
    'ngResource','ngMessages','slickCarousel','ngTable', 
    'ngStorage', 'angular.filter','ngAnimate' , 'ngMaterialDatePicker' ,'ngAria',
  ]);

  app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('altTheme')
    .primaryPalette('purple')

  });
  
  app.config(['slickCarouselConfig', function (slickCarouselConfig) {
    slickCarouselConfig.dots = true;
    slickCarouselConfig.autoplay = false;
  }]);
  /* app.config(function ($validatorProvider) {
        $validatorProvider.setDefaults({
            errorElement: 'div',
            // errorLabelContainer: '.customerror'
            errorPlacement: function(error, element) {
              console.log("element===",element,"  ",element['0'].type);
             element['0'].type;
             if(element['0'].type === 'radio' || element['0'].type==='date'){
              error.appendTo('.customerror');
             }else{
               error.appendTo('.text');
             }
          }
        });
    }); */

  app.config(function ($provide) {

  $provide.decorator('$exceptionHandler', function ($delegate) {

    return function (exception, cause) {
      $delegate(exception, cause);

     // alert('There is something wrong, please try again.');
    };
  });
});
app.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when("", "/home");
  var header = {
    templateUrl: "app/partials/header.html",
    controller: function ($scope) { 
     /*  $scope.ulshow=false;

      $scope.myFunction=function(){
        $scope.ulshow=!$scope.ulshow;
      } */
    

    }

  }
  var footer = {
    templateUrl: "app/partials/footer.html",
    controller: function ($scope, $document,$state) {
      $scope.toTheTop = function () {
        $document.scrollTopAnimated(0, 500).then(function () {
          // console.log('You just scrolled to the top!');
        });
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
app
    .directive('homeSection', function() {
    return ({
        restrict: 'E',
        transclude: 'true',
        templateUrl: 'app/components/homesection/homesection.html',

        
    });
});
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
'use strict';
app.controller('becomepartner', function ($scope, $http, $rootScope, RootAPIServices,$mdDialog, $timeout) {
  $rootScope.active = "becompartner";
   $scope.form = {};
   $scope.partner = {};
   $scope.response = {"isSuccess": false};

  //  console.log('---',$rootScope.active);
  $scope.becomePartner = function (ev) {
    var body = $scope.partner;
    RootAPIServices.rootApi.becomePartnerService({}, body).$promise.then(function (response) {
      $scope.response.isSuccess = true;
      $scope.partner = {};
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Thank you!')
          .textContent('Your request has been submitted.Our team will get back to you shortly.')
         // .htmlContent('Your request has been submitted.<br>Our team will get back to you shortly.')
          .ariaLabel('')
          .ok('Ok')
          .targetEvent(ev)
      );

      $scope.form.partnerForm.$setPristine();
      $scope.form.partnerForm.$setUntouched();
   
    });
  }

});

'use strict';

app.
controller('serviceForm', function($scope, $http ,mdcDateTimeDialog , $rootScope ,RootAPIServices) {
        var vm = this;
        $scope.parent =$scope.$parent;
        $scope.myForm ={};

        $scope.location=['East delhi','West delhi','North delhi','South Delhi'];
        $scope.date = moment().startOf('day');
        $scope.minDate = new Date();
        $scope.maxDate = moment().add(1, 'year');
        //$scope.disableDates = 

       $scope.displayDialogEdit = function (form) {
        mdcDateTimeDialog.show({
          currentDate: $scope.dateTimeEdit || moment().startOf('day'),
          maxDate: $scope.maxDate,
          showTodaysDate: '',
          time: true,
          minDate:$scope.minDate
        })
          .then(function (date) {
        //           $scope.projectForm.push
            $scope.myForm.serviceDate = date;
            $("#datetimeedit-error").hide();
          }, function(){});
      };

        
        $scope.progressbar=0;
        $scope.servicesCost=[];
        $scope.laundry=false;
        $scope.Math = window.Math;
        $scope.init=function(){
                $scope.pagecount=1;
                
                // console.log("--data here--",$scope.parent);
                // console.log("--data servicesCost--",$scope.parent.serviceCost)

                $scope.parent.serviceCost.forEach(function(element) {
                        // console.log(element.price);
                }, this);
                if($scope.parent.categoryServiceData.serviceType ===1){
                        $scope.stepCount= 4;
                }
                
                if($scope.parent.categoryServiceData.serviceCatId ===6){
                        $scope.laundry= true;
                        $scope.stepCount= 3;
                }
                else if($scope.parent.categoryServiceData.serviceType ===0){
                        $scope.stepCount= 1;
                }

                // console.log("initial page count==", $scope.pagecount);
        }


         $scope.actionButtonClick = function (pagecount , form) {
                if($scope.projectForm.$valid){
                 $scope.pagecount=pagecount;
                 pagecount--;
                 var perc=pagecount*100/ $scope.stepCount;
                        $scope.progressbar=perc;
                        $scope.myVar = true;
                }else{
                         $scope.myVar = false;
                }
                 /* if(form.validate()) {
        // Form is valid! 
                console.log("trueeeeeeeeeeeeee");
                 }else{
                         $scope.pagecount--;
                                form.validate();
                                return false;
                        } */
      };
                
          $scope.backButtonClick = function (pagecount){
                        $scope.pagecount=pagecount;
                        pagecount--;
                        var perc=pagecount*100/ $scope.stepCount;
                        $scope.progressbar=perc;
                        // $scope.pagecount--;
        };

                $scope.serviceFormSubmit=function(){
                                
                                 var enquire={};
                        
                                enquire.serviceId = $scope.categoryServiceData.id,
                                enquire.serviceCostId = $scope.myForm.serviceCostId,
                                enquire.house = $scope.myForm.house,
                                enquire.landmark= $scope.myForm.landmark,
                                enquire.locality= $scope.myForm.locality,
                                enquire.name= $scope.myForm.name,
                                enquire.phone= $scope.myForm.phone,
                                enquire.email= $scope.myForm.email,
                                enquire.serviceDate= $scope.myForm.serviceDate;
                        // enquire.push(data);
                         RootAPIServices.rootApi.bookOrEnquireService({},enquire).$promise.then(function (response) {

                                $scope.pagecount++;
                                $scope.progressbar=100;
                         });

                }

        $scope.init();

/* $scope.validationOptions = {
    rules: {
        serviceCostId: {
            required: true,
        },
        serviceDate: {
            required: true,
        }, 
        house:{
        required: true,
        },
        landmark:{
                required: true,
        },
        locality:{
                required: true,
        }
        
    },
    messages: {
        
    }
} */
        
});

app
  .directive('serviceSection', function () {
    return ({
      restrict: 'E',
      transclude: 'true',
      templateUrl: 'app/components/servicesection/services.html',
      
      link: function (scope, element, attrs) {

      },
      controller: function ($scope, $http, $rootScope, $mdDialog, $interval, RootAPIServices ) {
        $scope.setActive = function () {
          $rootScope.active = "service";
        }
        // console.log('------------',$rootScope.active);
       
      },
       compile: function compile( tElement, tAttributes ) {
            // console.log( tAttributes.log + ' (compile)'  );
            return {
                pre: function preLink( scope, element, attributes ) {
                    // console.log( attributes.log + ' (pre-link)'  );
                },
                post: function postLink( scope, element, attributes ) {
                    // console.log( attributes.log + ' (post-link)'  );
                }
            };
         }
     
    });
  });


app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log,$mdDialog) {
  $scope.toggleLeft = buildDelayedToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.isOpenRight = function () {
    return $mdSidenav('right').isOpen();
  };

  /**
   * Supplies a function that will continue to operate until the
   * time is up.
   */
  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $scope,
        args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function () {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildDelayedToggler(navID) {
    return debounce(function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }

  function buildToggler(navID) {
    return function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    };
  }

})
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  })
 
angular.module('NVConfig', [])

.constant('NVConfig', {
	// webservice_domain : 'http://52.32.68.31:8080/NovoWash',
	// webservice_domain : 'http://54.245.176.18:8080/NovoWash',
	webservice_domain : 'http://192.168.0.8:9090/NovoWash',
	})

;


app
  .controller("headerController",
  function ($scope, $http, $rootScope, $timeout, $document, $mdDialog, $interval, RootAPIServices,Utils) {


    
    $rootScope.active = "home";
    $scope.frameHeight = window.innerHeight;
    $scope.loaded = true;
    $scope.catModel = false;
    $scope.servModel = false;
    $scope.sticky =false;
    $scope.infografix=[
      {value:'0',text:'WORKING HOURS',max:'10000', type:'+' , icon:'query_builder'},
      {value:'0',text:'HAPPY CUSTOMERS',max:'1500' , type:'+',icon:'favorite_border'},
      // {value:'0',text:'VERIFIED EXPERTS',max:'99'},
      {value:'0',text:'positive feedback',max:'99' , type:'%',icon:'star_rate'},
    ]
    $document.on('scroll', function() {
      // console.log('Document scrolled to ', $document.scrollLeft(), $document.scrollTop());
      var topheight=$document.scrollTop();
      if(topheight > 0){
        // console.log("topheight true")
        $('#header').addClass('sticky');
      }
      if(topheight >= 1500){
        $timeout($scope.onTimeout,200);
      }else{
        $scope.infografix=[
          {value:'0',text:'WORKING HOURS',max:'10000', type:'+' , icon:'query_builder'},
          {value:'0',text:'HAPPY CUSTOMERS',max:'1500' , type:'+',icon:'favorite_border'},
          // {value:'0',text:'VERIFIED EXPERTS',max:'99'},
          {value:'0',text:'positive feedback',max:'99' , type:'%',icon:'star_rate'},
        ]
      }
    });
    $scope.onTimeout = function(){
      $scope.infografix.forEach(function(e) {
        var store=e.value;
         if (e.value < e.max) {
            e.value++;
            mytimeout = $timeout($scope.onTimeout,200);
        } else{
          e.value = e.max;
        }
      }, this);
  }

    $scope.catId;

    $timeout(function () {
      // Simulates loading
      $scope.loaded = false;
    }, 500);


    $scope.init = function () {
     
    }
/* 
    $scope.theme = 'red';

    var isThemeRed = true;

    $interval(function () {
      $scope.theme = isThemeRed ? 'green' : 'red';

      isThemeRed = !isThemeRed;
    }, 2000);  */

     RootAPIServices.rootApi.getAllServiceCategories({}).$promise.then(function (response) {
        $scope.allcategory = response.data;
        $rootScope.allcategory = response.data;
      })

    $scope.showAdvanced = function (event,catId) {
      console.log("catId in showAdvanced mehod====",catId);
       if(catId == undefined || catId == null){
         catId = 1;
         $scope.isCatShow=true;
       }else{
        $scope.isCatShow=false;
      $rootScope.catId = catId;
       $scope.catId=catId;
       }
       
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/components/servicesection/servicepopup.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        scope: $scope.$new()
      })
        .then(function (answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog, $rootScope ,$window) {

      console.log("window.innerWidth===",$window.innerWidth);

      $scope.catModel = true;
      var requestData = {};
      if($scope.catId != undefined || $scope.catId != null){

      requestData.categoryId = $scope.catId
      }else{
        requestData.categoryId =1;
        $scope.catId=1;
      }

      var isCatShow =$scope.isCatShow;
      $scope.allcategory.forEach(function (data) {
        if(data.id === $scope.catId){
          if(!$scope.isCatShow){
          $scope.unitCatName=data.catName;
          }
        }

      });
      // $scope.allcategory= $rootScope.allcategory;
      // $scope.catId = $rootScope.catId;
      
        RootAPIServices.rootApi.getAllServiceByCatId(requestData,null).$promise.then(function (response) {
        $scope.allServices = response.data;
      }) 
      

      $scope.getServiceById =function getServiceById(event, catId){
        // console.log('catId--',catId);
        $scope.catId=catId;
         RootAPIServices.rootApi.getAllServiceByCatId({categoryId:catId},null).$promise.then(function (response) {
        $scope.allServices = response.data;

      }) 
      }

      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function ($event) {
        $mdDialog.cancel();
        
      };

    }


      $scope.goToServiceForm = function (item, $event) {
        // console.log("-serviceid--",item.id);
        $scope.categoryServiceData=item;
        $scope.servModel = true;
        var serviceId =$scope.categoryServiceData.id;
        RootAPIServices.rootApi.getServicesCostById({serviceId:serviceId},null).$promise.then(function (response) {
        $scope.serviceCost=response.data;
        // console.log("---cost--",response.data)
        $mdDialog.show({
        controller: DialogControllerServ,
        templateUrl: 'app/components/servicesection/serviceForm.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: false,
        scope: $scope.$new()
      });

      }) 
      };


    function DialogControllerServ($scope, $mdDialog, $rootScope) {
      var requestData = {};
      // $scope.serviceCatId=serviceCatId;
      //   $scope.serviceId=item.id;
      angular.extend($scope,{
          categoryServiceData : $scope.categoryServiceData,
      });
      // console.log("$scope.categoryServiceData===",$scope.categoryServiceData);
      
      


      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function ($event) {
        $mdDialog.cancel();
        // console.log("---$rootScope.catId---",$rootScope.catId);
        $scope.showAdvanced($event,$rootScope.catId);
      };

     
    }


    $scope.init();
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */

/* start of mobile site */




  }).value('duScrollOffset', 30);

var app=angular.module("angularjsNodejsTutorial",[]);app.controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})}),(app=angular.module("angularjsNodejsTutorial",[])).controller("myController",function(o,r){o.data=[];var a=r.get("/data");a.success(function(r){o.data=r}),a.error(function(o){console.log("Error: "+o)})});