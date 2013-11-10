'use strict';

angular.module('webApp')
  .controller('MothersEditCtrl', function ($scope, $location, UsStates, AvailabilityCodes, LanguageCodes, Mother) {
    $scope.states = UsStates;
    $scope.availabilityCodes = AvailabilityCodes;
    $scope.langCodes = LanguageCodes;

    $scope.mother = {
      "__v": 16,
      "_id": "527ee220c2f63cc762000006",
      "email": "pam@email.com",
      "firstName": "Pam",
      "lastName": "Smith",
      "primaryVolunteer": "",
      "visits": [],
      "volunteers": [],
      "address": {
        line1: "123 xy ave",
        city: "Grand Rapids",
        "state": "MI",
        "zip": 458278
      },
      "emergencyContact": {
        "firstName": "bill",
        "lastName": "clinton"
      },
      "pediatrition": [],
      "restrictions": {
        "pets": [],
        "allergies": [],
        "medications": []
      },
      "languages": [],
      "availability": "PM",
      "children": [{
        "firstName": "Tim",
        "lastName": "Smith",
        "gender": "Male",
        "age": 3,
        "receivingServices": true
      }, {
        "firstName": "Billy",
        "lastName": "Smith",
        "gender": "Male",
        "age": 8
      }]
    };


    $scope.selectedAvailability = _.reduce($scope.availabilityCodes, function(res, av){
      return  $scope.mother.availability && ((av.value == $scope.mother.availability) ? av : res);
    });

    $scope.selectedState = _.reduce($scope.states, function(res, st){
      return  $scope.mother.address.state && ((st.abbreviation == $scope.mother.address.state) ? st : res);
    });

    $scope.selectedLanguages = _.filter($scope.langCodes, function(l) {
      return _.contains($scope.mother.languages, l.abbr);
    });


    $scope.update = function() {
      $scope.mother.address.state = $scope.selectedState.abbreviation;
      $scope.mother.availability = $scope.selectedAvailability.value;
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
