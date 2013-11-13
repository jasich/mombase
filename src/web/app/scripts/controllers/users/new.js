'use strict';

angular.module('webApp')
  .controller('UsersNewCtrl', function ($scope, Alerts, Users, $location) {

    $scope.user = {};

    $scope.isFormValid = function(){
        return $scope.newUser.$valid;
    }

    $scope.save = function() {
      var user = new Users($scope.user);
      user.$save(function(){
        $location.path('/users');
      });
    }

    $scope.isFieldInvalid = function(name)
    {
        var field = $scope.newUser[name];
        if(field)
        {
            return field.$dirty && field.$invalid;
        }
        else
            return false;
    }
  });
