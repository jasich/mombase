'use strict';

angular.module('webApp')
  .factory('Password', ["$resource", function Password($resource) {
    return $resource("api/users/:id/password",
      { id: '@id' },
      { update: { method:'PUT' } });
  }]);
