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