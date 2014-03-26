(function() {
   'use strict';

   angular.module('datavizApp.controllers')
      .controller('StockChartCtrl', ['$scope', '$http', 'priceHistoryStore', 'sharedSubsector', 'sharedSelection', function($scope, $http, priceHistoryStore, sharedSubsector, sharedSelection) {

         var baseConfig = {
                chart: {
                  events: {
                    load: function(e) {
                        var chart = this;
                        
                        var yAxis = chart.yAxis[0];
                        sharedSelection.data[0] = {
                          name: sharedSubsector.get(),
                          max:  yAxis.dataMax,
                          min: yAxis.dataMin
                        };
                    }
                  }
                },

                rangeSelector: {
                  inputEnabled: true,
                  selected: 4
                },

                xAxis: {
                   events: {
                      setExtremes: function(e) {
                        var chart = this.chart;

                         $scope.$apply(function () {
                            var yAxis = chart.yAxis[0];
                            sharedSelection.data[0] = {
                              name: sharedSubsector.get(),
                              max:  yAxis.dataMax,
                              min: yAxis.dataMin
                            };
                         });
                      }
                   }
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
            seriesOptions = [{ name: currentSubsector, data: data[currentSubsector] }];
            console.log(seriesOptions);
            $scope.chartConfig = angular.extend({}, baseConfig, { 'series' : seriesOptions});
         });
  

      }]);

}());