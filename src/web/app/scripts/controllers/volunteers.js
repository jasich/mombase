'use strict';

angular.module('webApp')
  .controller('VolunteersCtrl', function ($scope, Volunteer) {
      $scope.volunteers = [];

      Volunteer.search(function(data){
          $scope.volunteers = data;
      });

      $scope.$on('volunteer:delete', function(e, id) {
        _.remove($scope.volunteers, function(v) { return v._id == id });
      });
  })
  .controller('VolunteerRowCtrl', function($rootScope, $scope, Volunteer) {

    $scope.address = function() {
      $scope.volunteer.address || ($scope.volunteer.address = {});
      var keys = Object.keys($scope.volunteer.address)
        , values = keys.map(function(k) { return $scope.volunteer.address[k] });
      return values.join(', ');
    };

    $scope.delete = function() {
      Volunteer.delete({id:$scope.volunteer._id}, _.partial(_.bind($scope.$emit,$scope), 'volunteer:delete', $scope.volunteer._id));
    }

    $scope.store = function() {
      $rootScope.volunteer = $scope.volunteer;
    };
  });
