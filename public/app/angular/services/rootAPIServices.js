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
  return {
      rootApi:
      $resource(rootURL + '/services', {}, {


        getAllServiceCategories :{
        url: rootURL + '/get/category',
        method:'POST',
        transformResponse:defaultTransformResponse
        }

      })

  }

});