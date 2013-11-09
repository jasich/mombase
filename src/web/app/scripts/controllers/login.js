'use strict';

angular.module('webApp')
  .controller('LoginCtrl', function ($scope, Authentication) {
    
   		$scope.Login = function () {
   			Authentication.Login();
   		}
  });
