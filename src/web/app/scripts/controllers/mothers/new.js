'use strict';

angular.module('webApp')
  .controller('MothersNewCtrl', function ($rootScope, $scope, $location, $routeParams, UsStates, AvailabilityCodes, LanguageCodes, Mother, Alerts) {
    $scope.states = UsStates;
    $scope.availabilityCodes = AvailabilityCodes;
    $scope.langCodes = LanguageCodes;

    $scope.isFormValid = function(){
      return $scope.newMother.$valid;
    }

    $scope.isFieldInvalid = function(name)
    {
      var field = $scope.newMother[name];
      if(field)
      {
        return field.$dirty && field.$invalid;
      }
      else
        return false;
    }

    $scope.save = function() {
      $scope.mother.address.state = $scope.selectedState.abbreviation;
      $scope.mother.availability = $scope.selectedAvailability;
      $scope.mother.languages = _.map($scope.selectedLanguages, function(l) { return l.abbr });

      var mother = new Mother($scope.mother);
      mother.$save(function(){
        Alerts.addSuccess("Mother was saved successfully");
        $location.path('/mothers');
      }, function(){
        Alerts.addError("Unable to save the mother information.  Please review the form and try again.");
      });
    };
  });
