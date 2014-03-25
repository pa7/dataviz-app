(function() {
   'use strict';

   // create the angular app
   angular.module('datavizApp', [
      'datavizApp.directives',
      'datavizApp.controllers',
      'vr.directives.slider'
   ]);

   // setup dependency injection
   angular.module('d3', []);
   angular.module('datavizApp.directives', ['d3']);
   angular.module('datavizApp.controllers', []);

}());