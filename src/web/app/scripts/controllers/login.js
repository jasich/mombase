'use strict';

angular.module('webApp')
  .controller('LoginCtrl', ["$scope", "Alerts", "Authentication", function ($scope, Alerts, Authentication) {
  		$scope.user = {};
        $scope.errorMessage = '';

   		$scope.Login = function () {
   			Authentication.Login($scope.user.username, $scope.user.password)
                .then(angular.noop, function(){
                    $scope.errorMessage = "Invalid email or password";
                });
   		}
  }]);
