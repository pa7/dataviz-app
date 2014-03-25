(function() {
   'use strict';

   angular.module('datavizApp.controllers')
      .controller('StockChartCtrl', ['$scope', '$http', 'priceHistoryStore', 'sharedSubsector', function($scope, $http, priceHistoryStore, sharedSubsector) {
         var baseConfig = {
                chart: {},

                rangeSelector: {
                  inputEnabled: true,
                  selected: 4
                },

                yAxis: {
                   labels: {
                      formatter: function() {
                         return (this.value > 0 ? '+' : '') + this.value + '%';
                      }
                   },
                   plotLines: [{
                      value: 0,
                      width: 2,
                      color: 'silver'
                   }]
                },
                
                plotOptions: {
                   series: {
                      compare: 'percent'
                   }
                },
                
                tooltip: {
                   pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                   valueDecimals: 2
                }
          };

         var seriesOptions = [];
         
         priceHistoryStore.async().then(function(data) {
            var currentSubsector = sharedSubsector.get();
            seriesOptions.push({ name: currentSubsector, data: data[currentSubsector] });
            $scope.chartConfig = angular.extend({}, baseConfig, { 'series' : seriesOptions});
         });
  

      }]);

}());