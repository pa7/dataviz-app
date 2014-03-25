(function() {
   'use strict';

   angular.module('datavizApp.directives')
      .directive('lineChart', [function() {
         return {
            scope: {
               data: '=',
               config: '='
            },
            restrict: 'E',
            link: function(scope, element, attrs) {
               var chartConfig = {};
               element.addClass('fullwidth');
     
               scope.$watch('config', function(newVals, oldVals) {
                  scope.chart = element.highcharts('StockChart', newVals);
                  
               });
            }
         }
      }]);   



}());