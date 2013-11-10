'use strict';

angular.module('webApp')
  .controller('VolunteersNewCtrl', function ($location, $scope, UsStates, LanguageCodes, Volunteer) {
    $scope.states = UsStates;
    $scope.langCodes = LanguageCodes;

    $scope.volunteer = {}
    $scope.volunteer.languages = [$scope.langCodes[0]];


    $scope.save = function()
    {
      $scope.volunteer.address.state = $scope.selectedState.abbreviation;
      $scope.volunteer.languages = _.map($scope.selectedLanguages, function(l) { return l.abbr });
      var volunteer = new Volunteer($scope.volunteer);
      volunteer.$save(function() {
        Alerts.addSuccess("Volunteer was saved successfully");
        $location.path('/volunteers');
      },function(){
          Alerts.addError("Unable to save the volunteer information.  Please review the form and try again.");
      });
    }

    $scope.isFormValid = function(){
        return $scope.newVolunteer.$valid;
    }

    $scope.isFieldInvalid = function(name)
    {
        var field = $scope.newVolunteer[name];
        if(field)
        {
            return field.$dirty && field.$invalid;
        }
        else
            return true;
    }

  });
