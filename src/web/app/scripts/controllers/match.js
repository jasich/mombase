'use strict';

angular.module('webApp')
  .controller('MatchCtrl', function ($scope, $routeParams, GeoLocation, RangeOptions, Mother, Volunteer) {
    $scope.rangeOptions = RangeOptions;
    $scope.selectedRange = _.find($scope.rangeOptions, function(x) { return x.selected === true;});

    Mother.get({id: $routeParams.id}, function(data) {
      console.dir(data);
      $scope.mom = data;
    });

    Volunteer.search(function(data){
      $scope.volunteers = data;
    });

    $scope.FindWithin= function() {
      var range = $scope.selectedRange.value;
      var geoStuff = GeoLocation.GetLatLong({address: address($scope.mom.address)})
        .then(function(data){
          alert(data.lat + ' ' + data.lng);
          Volunteer.within({
            lon: data.lng,
            lat: data.lat,
            raduis: range
          }, function(data){
            debugger;
          });
        }, function(){});
    };

    var address = function(address) {
      var keys = Object.keys(address)
        , values = keys.map(function(k) { return address[k] });
      return values.join(', ');
    };
})
.controller('MatchRowCtrl', function($rootScope, $scope, Mother) {
    $scope.address = function() {
      $scope.volunteer.address || ($scope.volunteer.address = {});
      var keys = Object.keys($scope.volunteer.address)
        , values = keys.map(function(k) { return $scope.volunteer.address[k] });
      return values.join(', ');
    };

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
