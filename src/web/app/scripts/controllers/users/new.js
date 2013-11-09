'use strict';

angular.module('webApp')
  .controller('UsersNewCtrl', function ($scope, $location, Alerts) {

    $scope.isFormValid = function(){
        return $scope.newUser.$valid;
    }

    $scope.isFieldInvalid = function(name)
    {
        var field = $scope.newUser[name];
        if(field)
        {
            return field.$dirty && field.$invalid;
        }
        else
            return true;
    }

    $scope.save = function(){
        if($scope.isFormValid())
        {
            Alerts.addSuccess('User was created successfully');
            $location.path("/users");
        }else{
            Alerts.addWarning('The user you are trying to add is invalid.  Please check the form and try again');
        }
    }
  });
