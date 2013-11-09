'use strict';

angular.module('webApp')
  .controller('MatchCtrl', function ($scope, GeoLocation) {
	var promise = GeoLocation.GetLatLong({address: '720 E Fulton St. Grand Rapids, Michigan 49503'});
	promise.then(
		function(e){
			alert('winner: ' + e);
		},
		function(e){
			alert('Failure: ' + e);
		}
	);	
});
