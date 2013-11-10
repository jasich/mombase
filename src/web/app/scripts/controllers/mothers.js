'use strict';

angular.module('webApp')
  .controller('MothersCtrl', function ($scope, Mother, Alerts) {
    $scope.mothers = [];

    Mother.search(function(data){
      $scope.mothers = data;
    });

    $scope.$on('mother:delete', function(e, id) {
      Alerts.addSuccess("Mother was deleted successfully")
      _.remove($scope.mothers, function(v) { return v._id == id });
    });
    $scope.$on('mother:delete:error', function(e, id) {
      Alerts.addError("Unable to delete the mother");
    });
  })
  .controller('MotherRowCtrl', function($rootScope, $scope, Mother) {
    $scope.address = function() {
      $scope.mother.address || ($scope.mother.address = {});
      var keys = Object.keys($scope.mother.address)
        , values = keys.map(function(k) { return $scope.mother.address[k] });
      return values.join(', ');
    };

    $scope.delete = function() {
      Mother.delete({id:$scope.mother._id},
        _.partial(_.bind($scope.$emit,$scope), 'mother:delete', $scope.mother._id),
        _.partial(_.bind($scope.$emit, $scope), 'mother:delete:error', $scope.mother)
      );
    }

    $scope.store = function() {
      $rootScope.mother = $scope.mother;
      console.log($rootScope);
    };
  });
