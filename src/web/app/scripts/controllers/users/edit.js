'use strict';

angular.module('webApp')
  .controller('UsersEditCtrl', function ($scope, $q, $timeout, $routeParams) {
        function $mock(id, username, email, active)
        {
            return {
                id: id,
                username: username,
                email: email,
                active: active
            }
        }

        $scope.getUser = function(id)
        {
            $scope.user = $mock(1, "administrator", "admin@momsbloom.org", true);
        }


        $scope.isFormValid = function(){
            return $scope.editUser.$valid;
        }

        $scope.isFieldInvalid = function(name)
        {
            var field = $scope.editUser[name];
            if(field)
            {
                return field.$dirty && field.$invalid;
            }
            else
                return true;
        }

        $scope.getUser($routeParams.id);
  });
