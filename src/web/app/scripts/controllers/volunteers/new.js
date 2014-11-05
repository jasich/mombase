'use strict';

angular.module('webApp')
  .controller('VolunteersNewCtrl', ["$location", "$scope", "UsStates",
    "LanguageCodes", "Volunteer", "Alerts",
    function($location, $scope, UsStates, LanguageCodes, Volunteer, Alerts) {
      $scope.states = UsStates;
      $scope.langCodes = LanguageCodes;

      $scope.volunteer = {}
      $scope.volunteer.languages = [$scope.langCodes[0]];


      $scope.save = function() {
        if ($scope.selectedState) {
          $scope.volunteer.address.state = $scope.selectedState.abbreviation;
        }

        $scope.volunteer.languages = _.map($scope.selectedLanguages,
          function(l) {
            return l.abbr
          });

        var volunteer = new Volunteer($scope.volunteer);

        volunteer.$save(function() {
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
      }

      $scope.isFormValid = function() {
        return $scope.newVolunteer.$valid;
      }

      $scope.isFieldInvalid = function(name) {
        var field = $scope.newVolunteer[name];
        if (field) {
          return field.$dirty && field.$invalid;
        } else
          return true;
      }

    }
  ]);
