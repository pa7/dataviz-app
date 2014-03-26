(function() {
   'use strict';

   angular.module('datavizApp.controllers')
      .controller('DialogCtrl', ['$scope', '$modalInstance', 'sharedSubsector', 'sharedSelection', function($scope, $modalInstance, sharedSubsector, sharedSelection) {
         $scope.selection = sharedSelection.data;
         $scope.subsector = sharedSubsector.get();
         $scope.$watch('sharedSelection.data', function(newVals, oldVals) {
            if (newVals != oldVals) 
            $scope.selection = newVals;
         }, true);
      }]);

}());