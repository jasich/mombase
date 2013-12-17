'use strict';

angular.module('webApp')
  .factory('Mother', ["$resource", function Mothers($resource) {
    var resource = $resource("api/mothers/:action/:id",
      {id: '@id', action: '@action'},
      {
        search: {method: 'POST', isArray: true, params: {action: 'search'}},
        update: {method:'PUT'},
        assign: {method: 'POST', isArray: false, params: {action: 'assign', volunteerEmail: "@volunteerEmail"}},
        unassign: {method: 'POST', isArray: false, params: {action: 'unassign', volunteerEmail: "@volunteerEmail"}}
      });

    return resource;
  }]);
