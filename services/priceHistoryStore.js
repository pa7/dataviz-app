(function() {

   angular.module('datavizApp.services')
      .factory('priceHistoryStore', ['$http', function($http) {
         var promise;
         var priceHistories = {
            async: function() {
               if (!promise) {
                  promise = $http({
                     url: 'data/prices_for_subsectors.json',
                     method: 'GET'
                  }).then(function(res) {
                     return res.data;
                  });
               }
               return promise;
            }
         }
         return priceHistories;
      }]);

}());