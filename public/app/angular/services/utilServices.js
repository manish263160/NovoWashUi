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