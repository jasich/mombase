'use strict';

angular.module('webApp')
  .controller('VolunteersEditCtrl', ["$location", "$rootScope", "$scope", "$q",
    "UsStates", "LanguageCodes", "Volunteer", "Alerts", "$routeParams",
    "GeoLocation",
    function($location, $rootScope, $scope, $q, UsStates, LanguageCodes,
      Volunteer, Alerts, $routeParams, GeoLocation) {
      $scope.states = UsStates;
      $scope.langCodes = LanguageCodes;

      var assignRestrictions = function(volunteer) {
        if (volunteer.restrictions) {
          $scope.restrictionList = volunteer.restrictions.join(', ');
        }

        if (volunteer.skills) {
          $scope.skillList = volunteer.skills.join(', ');
        }

        $scope.selectedState = _.reduce($scope.states, function(res, st) {
          return $scope.volunteer.state && ((st.abbreviation == $scope.volunteer
            .address.state) ? st : res);
        });

        $scope.selectedLanguages = _.filter($scope.langCodes, function(l) {
          return _.contains($scope.volunteer.languages, l.abbr);
        });
      };

      $scope.resolveVolunteer = function() {
        var deferred = $q.defer();

        if ($rootScope.volunteer) {
          $scope.volunteer = $rootScope.volunteer;
          deferred.resolve($rootScope.volunteer);
        } else if ($scope.volunteer) {
          deferred.resolve($scope.volunteer);
        } else {
          Volunteer.get({
              id: $routeParams.id
            },
            function(value) {
              $scope.volunteer = value;
              deferred.resolve(value);
            },
            function(value) {
              deferred.reject(value);
            }
          );
        }

        return deferred.promise;
      };

      $scope.resolveVolunteer().then(assignRestrictions);



      $scope.getLanguageName = function(code) {
        var found = _.find($scope.langCodes, function(lang) {
          return code == lang.abbr;
        });

        if (found)
          return found.name;
        else
          return code;
      }

      $scope.update = function() {
        //$scope.volunteer.address.state = $scope.selectedState.abbreviation;
        //$scope.volunteer.languages = _.map($scope.selectedLanguages, function(l) { return l.abbr });

        var updateVolunteer = function() {
          var volunteer = new Volunteer($scope.volunteer);
          volunteer.$update(function() {
            Alerts.addSuccess("Volunteer was saved successfully");
            $location.path('/volunteers');
          }, function(resp) {
            if (resp.data.name == "ValidationError") {
              var badFields = [];
              for (var field in resp.data.errors) {
                badFields.push(field);
              }

              $scope.errMessage =
                "Unable to save. Please fix the following fields: " +
                badFields.join(', ');
            } else {
              $scope.errMessage = "Unable to save. " + resp.data.message;
            }
          });
        };

        var geoPromise = GeoLocation.GetLatLong({
            address: address($scope.volunteer.address)
          })
          .then(function(data) {
            if (data && data.lat) {
              console.log('setting volunteer coordinates to: ' + data.lng +
                ", " + data.lat);
              $scope.volunteer.loc = [data.lng, data.lat];

              // Angular 1.0.8 does not have a finally method on promises, so we call it on both...
              updateVolunteer();
            }
          }, function() {
            console.log('Could not locate volunteer address...');

            // Angular 1.0.8 does not have a finally method on promises, so we call it on both...
            updateVolunteer();
          });
      };

      var address = function(address) {
        var keys = Object.keys(address),
          values = keys.map(function(k) {
            return address[k]
          });
        return values.join(', ');
      };

      $scope.isFormValid = function() {
        return $scope.editVolunteer.$valid;
      }

      $scope.isFieldInvalid = function(name) {
        var field = $scope.editVolunteer[name];
        if (field) {
          return field.$dirty && field.$invalid;
        } else
          return true;
      }
    }
  ]);
