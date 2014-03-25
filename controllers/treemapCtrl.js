(function() {
   'use strict';

   angular.module('datavizApp.controllers', [])
      .controller('TreemapCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
         
         $scope.currentIndex = -1;
         $scope.dataKeys = [];
         $scope.currentDay = "";
         $scope.runAnimation = false;
         $scope.animationSpeed = 1000;

         $http({
            method: 'GET',
            url: '/data/processed-data.json'
         }).then(function(data, status) {
            // TODO: move / reduce
            $scope.allData = data.data;
            // datakeys are the dates
            $scope.dataKeys = Object.keys.call(Object, data.data);
            $scope.currentIndex = 0;
            $scope.currentDay = $scope.dataKeys[$scope.currentIndex];
            $scope.currentData = $scope.allData[$scope.currentDay];  // set data to first data entry
         });

         // animate data
         $scope.cycle = function cycle() {
            if (!$scope.runAnimation) {
               return;
            }
            $scope.next();
            // loop 
            $timeout(cycle, $scope.animationSpeed);
         };

         $scope.next = function() {
            $scope.currentIndex++;
            if ($scope.currentIndex == $scope.dataKeys.length) {
               $scope.currentIndex = 0;
            }
            $scope.currentDay = $scope.dataKeys[$scope.currentIndex];
            $scope.currentData = $scope.allData[$scope.currentDay];
         };

         $scope.togglePlay = function() {

            $scope.runAnimation = !$scope.runAnimation;
            $scope.cycle();

         };

         $scope.sliderTranslateFn = function(val) {
            return $scope.dataKeys[val];
         };

         $scope.$watch('currentIndex', function(newVals, oldVals) {
            if(newVals != oldVals) {
               $scope.currentDay = $scope.dataKeys[newVals];
               $scope.currentData = $scope.allData[$scope.currentDay];
            }
         }, true);

         // set the data to treemap
         
         $scope.treemapOnClick = function(item) {
            //   load detail modal dialog
            $scope.runAnimation = false;
            console.log('jooo',item);
         };

      }]);

}());