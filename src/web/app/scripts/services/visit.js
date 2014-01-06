'use strict';

angular.module('webApp')
  .factory('Visit', function ($resource) {
    var resource = $resource("api/mothers/:mid/visits/:id/:action",
        {id: '@id', mid: '@mid', action: '@action'},
        {
            search: {method: 'POST', isArray: true, params: {action: 'search'}},
            update: {method:'PUT'}
        });

    return resource;
  });
