'use strict';

angular.module('webApp')
  .controller('VolunteersNewCtrl', function ($scope, UsStates) {
    $scope.states = UsStates;
    console.log($scope.states);

    $scope.isFormValid = function(){
        return $scope.newVolunteer.$valid;
    }

    $scope.isFieldInvalid = function(name)
    {
        var field = $scope.newVolunteer[name];
        if(field)
        {
            return field.$dirty && field.$invalid;
        }
        else
            return true;
    }
  });
