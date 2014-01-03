'use strict';

angular.module('webApp')
  .controller('MothersEditCtrl', ["$rootScope","$filter", "$injector", "$scope", "$location", "$routeParams", function ($rootScope,$filter, $injector, $scope, $location, $routeParams) {
    $scope.states = $injector.get("UsStates");
    $scope.availabilityCodes = $injector.get("AvailabilityCodes");
    $scope.langCodes = $injector.get("LanguageCodes");

    var addressHelper = $injector.get("AddressHelper"),
        GeoLocation = $injector.get("GeoLocation"),
        Mother = $injector.get("Mother"),
        Alerts = $injector.get("Alerts");

    $scope.formatDate = function(date)
    {
      return $filter('date')(date, 'yyyy-MM-dd');
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

    $scope.mother = Mother.get({id: $routeParams.id}, function(mom){
      $scope.mother.birthdate = $scope.formatDate($scope.mother.birthdate);
      if($scope.mother.communication){
        $scope.mother.communication.requestForServices.sent = $scope.formatDate($scope.mother.communication.requestForServices.sent);
        $scope.mother.communication.requestForServices.response = $scope.formatDate($scope.mother.communication.requestForServices.response);

        if ($scope.mother.communication.waiver) {
          $scope.mother.communication.waiver.sent = $scope.formatDate($scope.mother.waiver.requestForServices.sent);
          $scope.mother.communication.waiver.response = $scope.formatDate($scope.mother.waiver.requestForServices.response);
        }
      }

      if ($scope.mother.restrictions) {
        $scope.restrictionList = $scope.mother.restrictions.join(', ');
      }

      $scope.mother.address = $scope.mother.address || {};

      if (typeof $scope.mother.availability !== 'undefined') {
        $scope.selectedAvailability = _.find($scope.availabilityCodes,
          function(x) { return x.value === $scope.mother.availability; });
      }

      $scope.selectedState = _.reduce($scope.states, function(res, st){
        return $scope.mother.address.state && ((st.abbreviation == $scope.mother.address.state) ? st : res);
      });

      $scope.selectedLanguages = _.filter($scope.langCodes, function(l) {
        return _.contains($scope.mother.languages, l.abbr);
      });
    });


    $scope.update = function() {
      //$scope.mother.address.state = $scope.selectedState.abbreviation;
      $scope.mother.availability = $scope.selectedAvailability.value;
      //$scope.mother.languages = _.map($scope.selectedLanguages, function(l) { return l.abbr });

      var motherUpdate = function () {
        var mother = new Mother($scope.mother);
        mother.$update(function(){
          Alerts.addSuccess("Mother was saved successfully");
          $location.path('/mothers');
        }, function(){
          Alerts.addError("Unable to save the mother information.  Please review the form and try again.");
        });
      };

      var geoPromise = GeoLocation.GetLatLong({address: address($scope.mother.address)})
        .then(function(data){
          if (data && data.lat) {
            $scope.mother.loc = [data.lng, data.lat];

            // Angular 1.0.8 does not have a finally method on promises, so we call it on both...
            motherUpdate();
          }
        }, function(){
          console.log('Could not locate mothers address...');

          // Angular 1.0.8 does not have a finally method on promises, so we call it on both...
          motherUpdate();
        });


    };

    var address = function(address) {
      var keys = Object.keys(address)
        , values = keys.map(function(k) { return address[k] });
      return values.join(', ');
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

    /*
     Address Helpers
     */
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
