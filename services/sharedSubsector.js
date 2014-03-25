(function() {
   'use strict';

   angular.module('datavizApp.services')
      .factory('sharedSubsector', function() {
         var subsector = '';
         return {
            set: function(s) { subsector = s; },
            get: function() { return subsector }
         };
      });


}());