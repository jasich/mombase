'use strict';

angular.module('webApp')
	.service('ErrorHandler', function() {
		// AngularJS will instantiate a singleton by calling "new" on this function
		this.Log = function(service, msg){
			// TODO identify invoking service
			console.log(msg);
		};
	});
