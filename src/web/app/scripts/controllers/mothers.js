'use strict';

angular.module('webApp')
  .controller('MothersCtrl', function ($scope, Mother) {
    $scope.mothers = [];

    Mother.search(function(data){
      $scope.mothers = data;
    });

    $scope.$on('mother:delete', function(e, id) {
      _.remove($scope.mothers, function(v) { return v._id == id });
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
      Mother.delete({id:$scope.mother._id}, _.partial(_.bind($scope.$emit,$scope), 'mother:delete', $scope.mother._id));
    }

    $scope.store = function() {
      $rootScope.mother = $scope.mother;
      console.log($rootScope);
    };
  });
