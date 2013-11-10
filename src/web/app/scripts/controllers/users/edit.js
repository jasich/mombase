'use strict';

angular.module('webApp')
  .controller('UsersEditCtrl', function ($scope, $q, $timeout, $routeParams, Users, $rootScope, $location) {
        $scope.user = $rootScope.editingUser || $scope.user || Users.get({id: $routeParams.id});

        $scope.isFormValid = function(){
            return $scope.editUser.$valid;
        }

        $scope.update = function() {
          $scope.user.id = $scope.user._id;
          if (! $scope.user.password)
            delete $scope.user.password;
          var user = new Users($scope.user);
          user.$update(function(){
            $location.path('/users');
          });
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
  });
