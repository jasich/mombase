'use strict';

angular.module('webApp')
  .factory('Users', ["$resource", function Users($resource) {
    return $resource("api/users/:id/:action",
      {id: '@id', action: '@action'},
      {
        update: {method:'PUT'}
      });
  }]);
