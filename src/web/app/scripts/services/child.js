'use strict';

angular.module('webApp')
  .factory('Child', function Child($resource) {
        var resource = $resource("api/mothers/:mid/children/:id/:action",
            {id: '@id', mid: '@mid', action: '@action'},
            {
                search: {method: 'POST', isArray: true, params: {action: 'search'}},
                update: {method:'PUT'}
            });

        return resource;
  });
