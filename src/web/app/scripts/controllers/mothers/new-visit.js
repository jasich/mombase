'use strict';

angular.module('webApp')
  .controller('MothersNewVisitCtrl', function ($scope, $injector, $routeParams, $location) {
        var FormValidation = $injector.get("FormValidationHelper"),
            Mother  =    $injector.get("Mother"),
            Visit   =    $injector.get("Visit"),
            Alerts  =    $injector.get("Alerts");

        $scope.visit = {};

        $scope.form = new FormValidation($scope, 'visitForm');

        $scope.mother = Mother.get(
            {id: $routeParams.id},
            function(mom){
                //mother loaded successfully
            },
            function(){
                Alerts.addError('Unable to find the mother.');
            });

        $scope.save = function()
        {
            if(!$scope.form.isFormValid()) return;

            var child = new Child($scope.currentChild);

            child.$save(
                {
                    mid: $scope.mother._id
                },
                function(){
                    Alerts.addSuccess('Visit was added successfully');
                    $location.path(['/mothers', $scope.mother._id, 'visits'].join('/'));
                }, function(){
                    Alerts.addError('Unable to save visit.  Please review the form and try again.');
                });
        }
  });
