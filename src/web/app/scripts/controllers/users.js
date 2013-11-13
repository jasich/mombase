'use strict';

angular.module('webApp')
  .controller('UsersCtrl', function ($scope, Alerts, Users) {

        $scope.users = Users.query();

        $scope.deleteUser = function(id)
        {
            //Make call to service to delete
            Alerts.addSuccess('User was deleted successfully');

        }

      $scope.$on('user:delete', function(e, id) {
        _.remove($scope.users, function(v) { return v._id == id });
      });
  })
  .controller('UserRowCtrl', function($scope, $rootScope, Users) {
    $scope.delete = function() {
      Users.delete({id:$scope.user._id}, _.partial(_.bind($scope.$emit,$scope), 'user:delete', $scope.user._id));
    };

    $scope.store = function() {
      $rootScope.editingUser = $scope.user;
    };
  });
