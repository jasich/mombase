'use strict';

angular.module('webApp')
  .controller('MothersNewCtrl', function ($rootScope, $scope, $location, $routeParams, UsStates, AvailabilityCodes, LanguageCodes, Mother, Alerts) {
    $scope.states = UsStates;
    $scope.availabilityCodes = AvailabilityCodes;
    $scope.langCodes = LanguageCodes;
    $scope.mother = {};

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

    $scope.save = function() {
      $scope.mother.availability = $scope.selectedAvailability;
      //$scope.mother.languages = _.map($scope.selectedLanguages, function(l) { return l.abbr });

      var mother = new Mother($scope.mother);
      mother.$save(function(){
        Alerts.addSuccess("Mother was saved successfully");
        $location.path('/mothers');
      }, function(){
        Alerts.addError("Unable to save the mother information.  Please review the form and try again.");
      });
    };
  });
