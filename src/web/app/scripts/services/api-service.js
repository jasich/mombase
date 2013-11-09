'use strict';

angular.module('webApp')
  .factory('apiService', function ($rootScope,$injector, $q, Messenger) {
        function ApiService(resource, evName)
        {
            this.resource = resource;
            this.eventNameRoot = evName || 'api';
        }

        var service = new ApiService();

        /**
         * Get name of entity that will be used to pass to event messages
         * @param action
         * @param outcome
         * @returns {string}
         */
        ApiService.prototype.getEventName = function()
        {
            var args = [this.eventNameRoot].concat(Array.prototype.slice.call(arguments));
            return args.join(":");
        }

        /**
         * Get a single resource item
         * @param id
         * @returns {*}
         */
        ApiService.prototype.get = function(id)
        {
            Messenger.send('activity:loading', true);

            var service = this,
                defer = $q.defer();

            this.resource.get({
                    id: id
                }, function(entity){
                    defer.resolve(entity);
                    Messenger.send('activity:loading', false);
                    Messenger.send(service.getEventName('get', 'success'), data, data);
                },
                function(response){
                    defer.reject(response);
                    Messenger.send('activity:loading', false);
                    Messenger.send(service.getEventName('get', 'failure'), response);
                });

            return defer.promise;
        }


  });
