app.service('Utils', function() {

    var allcategory =[];

    this.allcategory = function (active) {
        RootAPIServices.rootApi.getAllServiceCategories({}).$promise.then(function (response) {
        return response.data;
      })
    }
});