(function() {
   'use strict';

   angular.module('datavizApp.services')
      .factory('sharedSelection', function() {
         var data = [{ name: 'Test', min: 0, max: 0}];
         return {
            data: data
         };
      });


}());