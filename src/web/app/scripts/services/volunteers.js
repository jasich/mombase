'use strict';

angular.module('webApp')
  .factory('Volunteer', function Volunteers($resource) {
        var resource = $resource("api/volunteers/:id/:action",
            {id: '@id', action: '@action'},
            {
                update: {method:'PUT'},
                search: {method: 'POST', isArray: true, params: {action: 'search'}}
            });

        return resource;
  });
