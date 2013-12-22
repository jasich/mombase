'use strict';

angular.module('webApp')
  .controller('ChangePasswordCtrl', ["$scope", 'Password', 'Authentication', 'Alerts', function ($scope, Password, Authentication, Alerts) {
    $scope.user = {};
    $scope.errorMessage = '';

    $scope.ChangePassword = function () {
      var curUser = Authentication.getCurrentUser();
      $scope.user.id = curUser._id;

      Password.update($scope.user, function(data){
        if (data.success) {
          $scope.user = {};
          $scope.errorMessage = '';
          Alerts.addSuccess("Password updated");
        } else {
          $scope.errorMessage = data.errorMessage;
        }
      });
    };
  }]);
