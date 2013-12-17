'use strict';

angular.module('webApp')
  .controller('MothersNewCtrl', ["$rootScope", "$scope", "$injector", "$location", "$routeParams", function ($rootScope, $scope, $injector, $location, $routeParams) {
    var addressHelper = $injector.get("AddressHelper"),
        GeoLocation = $injector.get("GeoLocation"),
        Mother = $injector.get("Mother"),
        Alerts = $injector.get("Alerts");

    $scope.states = $injector.get("UsStates");
    $scope.availabilityCodes = $injector.get("AvailabilityCodes");
    $scope.langCodes = $injector.get("LanguageCodes");

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

    $scope.isValidAddress = function()
    {
        return addressHelper.isLocatableAddress($scope.mother.address);
    }

    $scope.findLatLng = function()
    {
        GeoLocation.GetLatLong({address: $scope.address()})
            .then(function(data){
                if(data && data.lat){
                    $scope.mother.loc = [data.lng, data.lat];
                }
            })
    }

    $scope.address = function() {
        return addressHelper.formatAddress($scope.mother.address)
    };
  }]);
