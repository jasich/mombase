'use strict';

angular.module('webApp')
    .controller('VolunteersEditCtrl', function ($location, $rootScope, $scope, UsStates, LanguageCodes, Volunteer, $routeParams) {
        $scope.states = UsStates;
        $scope.langCodes = LanguageCodes;

        $scope.volunteer = $rootScope.volunteer || $scope.volunteer || Volunteer.get({id: $routeParams.id});

        $scope.selectedState = _.reduce($scope.states, function(res, st){
          return  $scope.volunteer.state && ((st.abbreviation == $scope.volunteer.address.state) ? st : res);
        });

        $scope.selectedLanguages = _.filter($scope.langCodes, function(l) {
          return _.contains($scope.volunteer.languages, l.abbr);
        });

        $scope.update = function()
        {
          $scope.volunteer.address.state = $scope.selectedState.abbreviation;
          $scope.volunteer.languages = _.map($scope.selectedLanguages, function(l) { return l.abbr });
          var volunteer = new Volunteer($scope.volunteer);
          volunteer.$update(function() {
            $location.path('/volunteers');
          });
        }

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
    });
