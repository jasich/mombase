'use strict';

angular.module('webApp')
  .service('Users', function Users($resource, apiService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var resource = $resource("api/users/:id/:action");

        var service = apiService(resource, 'user');


  });
