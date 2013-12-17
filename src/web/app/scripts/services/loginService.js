'use strict';

angular.module('webApp')
  .factory('loginService', ["$resource", function ($resource) {
    return $resource("/api/users/login")
  }]);
