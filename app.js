(function() {
   'use strict';

   // create the angular app
   angular.module('datavizApp', [
      'datavizApp.directives',
      'datavizApp.controllers',
      'datavizApp.services',
      'vr.directives.slider',
      'ui.bootstrap'
   ]);

   // setup dependency injection
   angular.module('d3', []);
   angular.module('datavizApp.directives', ['d3']);
   angular.module('datavizApp.controllers', []);
   angular.module('datavizApp.services', []);
}());