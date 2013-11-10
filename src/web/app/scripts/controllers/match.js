'use strict';

angular.module('webApp')
  .controller('MatchCtrl', function ($scope, $routeParams, GeoLocation, Mother) {
//	var promise = GeoLocation.GetLatLong({address: '720 E Fulton St. Grand Rapids, Michigan 49503'});
//	promise.then(
//		function(e){
//			alert('winner: ' + e);
//      console.dir(e);
//		},
//		function(e){
//			alert('Failure: ' + e);
//		}
//	);

    $scope.rangeOptions = [
      { label: '5 miles', value: '5', selected: true},
      { label: '10 miles', value: '10', selected: false},
      { label: '15 miles', value: '15', selected: false}
    ];


    Mother.get({id: $routeParams.id}, function(data) {
      console.dir(data);
      $scope.mom = data;
    });

    $scope.volunteers = [
        {
          "_id": "527ee220c2f63cc76200000a",
          "email": "chuck@email.com",
          "firstName": "Chuck",
          "lastName": "Yeager",
          "availability": [],
          "languages": [],
          "restrictions": [],
          "skills": []
        },
        {
          "_id": "527ee220c2f63cc76200000a",
          "email": "steve@email.com",
          "firstName": "Steve",
          "lastName": "Jobs",
          'active': true,
          "availability": [],
          "languages": [],
          "restrictions": [],
          "skills": []},
        {
          "_id": "527ee220c2f63cc76200000a",
          "email": "bill@email.com",
          "firstName": "Bill",
          "lastName": "Gates",
          "availability": [],
          "languages": [],
          "restrictions": [],
          "skills": []}
      ];

    $scope.assignVolunteer = function(volunteerEmail) {
      Mother.assign({id: $scope.mom._id, volunteerEmail: volunteerEmail}, function(data){
        $scope.mom = data;
      });
    };

    $scope.unassignVolunteer = function(volunteerEmail) {
      Mother.unassign({id: $scope.mom._id, volunteerEmail: volunteerEmail}, function(data){
        $scope.mom = data;
      });
    };
});
