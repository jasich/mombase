'use strict';

angular.module('webApp')
    .controller('VolunteersEditCtrl', ["$location", "$rootScope", "$scope", "UsStates", "LanguageCodes", "Volunteer","Alerts", "$routeParams", "GeoLocation", function ($location, $rootScope, $scope, UsStates, LanguageCodes, Volunteer,Alerts, $routeParams, GeoLocation) {
        $scope.states = UsStates;
        $scope.langCodes = LanguageCodes;

        $scope.volunteer = $rootScope.volunteer || $scope.volunteer || Volunteer.get({id: $routeParams.id});

        $scope.selectedState = _.reduce($scope.states, function(res, st){
          return  $scope.volunteer.state && ((st.abbreviation == $scope.volunteer.address.state) ? st : res);
        });

        $scope.selectedLanguages = _.filter($scope.langCodes, function(l) {
          return _.contains($scope.volunteer.languages, l.abbr);
        });

        $scope.getLanguageName = function(code)
        {
            var found = _.find($scope.langCodes, function(lang){
                return code == lang.abbr;
            });

            if(found)
                return found.name;
            else
                return code;
        }

        $scope.update = function()
        {
          //$scope.volunteer.address.state = $scope.selectedState.abbreviation;
          //$scope.volunteer.languages = _.map($scope.selectedLanguages, function(l) { return l.abbr });

          var updateVolunteer = function () {
            var volunteer = new Volunteer($scope.volunteer);
            volunteer.$update(function() {
                Alerts.addSuccess("Volunteer was saved successfully");
              $location.path('/volunteers');
            }, function(){
                Alerts.addError("Unable to save the volunteer information.  Please review the form and try again.");
            });
          };

          var geoPromise = GeoLocation.GetLatLong({address: address($scope.volunteer.address)})
            .then(function(data){
              if (data && data.lat) {
                console.log('setting volunteer coordinates to: ' +  data.lng + ", "  + data.lat);
                $scope.volunteer.loc = [data.lng, data.lat];

                // Angular 1.0.8 does not have a finally method on promises, so we call it on both...
                updateVolunteer();
              }
            }, function(){
              console.log('Could not locate volunteer address...');

              // Angular 1.0.8 does not have a finally method on promises, so we call it on both...
              updateVolunteer();
            });
        };

        var address = function(address) {
          var keys = Object.keys(address)
            , values = keys.map(function(k) { return address[k] });
          return values.join(', ');
        };

        $scope.isFormValid = function(){
            return $scope.editVolunteer.$valid;
        }

        $scope.isFieldInvalid = function(name)
        {
            var field = $scope.editVolunteer[name];
            if(field)
            {
                return field.$dirty && field.$invalid;
            }
            else
                return true;
        }
    }]);
