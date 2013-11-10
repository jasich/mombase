'use strict';

angular.module('webApp')
  .controller('MothersEditCtrl', function ($rootScope, $scope, $location, $routeParams, UsStates, AvailabilityCodes, LanguageCodes, Mother) {
    $scope.states = UsStates;
    $scope.availabilityCodes = AvailabilityCodes;
    $scope.langCodes = LanguageCodes;

    $scope.mother = $rootScope.mother || $scope.mother || Mother.get({id: $routeParams.id});

    $scope.mother.address = $scope.mother.address || {};


    $scope.selectedAvailability = _.reduce($scope.availabilityCodes, function(res, av){
      return  $scope.mother.availability && ((av.value == $scope.mother.availability) ? av.value : res.value);
    });

    $scope.selectedState = _.reduce($scope.states, function(res, st){
      return  $scope.mother.address.state && ((st.abbreviation == $scope.mother.address.state) ? st : res);
    });

    $scope.selectedLanguages = _.filter($scope.langCodes, function(l) {
      return _.contains($scope.mother.languages, l.abbr);
    });


    $scope.update = function() {
      $scope.mother.address.state = $scope.selectedState.abbreviation;
      $scope.mother.availability = $scope.selectedAvailability;
      $scope.mother.languages = _.map($scope.selectedLanguages, function(l) { return l.abbr });

      var mother = new Mother($scope.mother);
      mother.$update(function(){
        $location.path('/mothers');
      });
    };

    $scope.isFormValid = function(){
      return $scope.editMother.$valid;
    }

    $scope.isFieldInvalid = function(name)
    {
      var field = $scope.editMother[name];
      if(field)
      {
        return field.$dirty && field.$invalid;
      }
      else
        return true;
    }
  });
