'use strict';

angular.module('webApp')
  .service('Messenger', ["$rootScope", "$log", function Messenger($rootScope, $log) {
        function Messenger(scope){
            this.root = scope || $rootScope;
            this.debug = false;
        }

        Messenger.prototype.log = function(){
            if(this.debug)
                $log.debug.apply($log, arguments);
        }

        /**
         * Send a message to the messenger of a specified scope
         * @param scope
         * @param key
         */
        Messenger.prototype.sendTo = function(scope, key){
            var args = Array.prototype.slice.call(arguments, 1);
            this.log('Say ', key, ' to ', scope, ' with ', args);
            scope.$broadcast.apply(scope, args);
        }

        Messenger.prototype.sendToAll = function(scope, keys){
            var args = Array.prototype.slice.call(arguments, 2);
            keys.forEach(function(key){
                this.sendTo.apply(this, [scope, key].concat(args));
            }, this);

        }

        /**
         * Send a message to the messenger root scope
         * @param key
         * @param data
         */
        Messenger.prototype.send = function(key)
        {
            var args = [this.root, key].concat(Array.prototype.slice.call(arguments, 1));
            this.sendTo.apply(this, args);
        }

        Messenger.prototype.sendAll = function(keys)
        {
            var args = [this.root, keys].concat(Array.prototype.slice.call(arguments, 1));
            this.sendToAll.apply(this, args);

        }



        /**
         * Check to see messenger has a listener for an event
         * @param key
         * @returns {boolean}
         */
        Messenger.prototype.hasListener = function(key)
        {
            var listeners = this.scope && this.root.$$listeners[key];

            return listeners && listeners.length > 0;
        }

        /**
         * Listen to a message passed to a specific scope
         * @param scope
         * @param key
         * @param listener
         */
        Messenger.prototype.listenTo = function(scope, key, listener)
        {
            this.log('Listen to ', key, ' with ', listener);

            if(angular.isArray(key)){
                key.forEach(function(k){
                    this.listenTo(scope, k, listener);
                }, this);

                return;
            }

            scope.$on(key, function(ev){
                //remove event from return data
                var args = Array.prototype.slice.call(arguments, 1);

                if(listener)
                    listener.apply(this, args);
            });
        }

        /**
         * Listen to a message passed to the root scope
         * @param key
         * @param listener
         */
        Messenger.prototype.listen = function(key, listener)
        {
            this.listenTo($rootScope, key, listener);
        }

        return new Messenger($rootScope);
  }]);
