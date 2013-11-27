'use strict';

angular.module('webApp')
  .controller('MothersNewChildCtrl', function ($scope, $injector, $routeParams, $location) {
        var FormValidation = $injector.get("FormValidationHelper"),
            Mother  =    $injector.get("Mother"),
            Child   =    $injector.get("Child"),
            Alerts  =    $injector.get("Alerts");

        $scope.currentChild = {};

        $scope.form = new FormValidation($scope, 'childForm');

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
                    Alerts.addSuccess('Child was added successfully');
                    $location.path(['/mothers', $scope.mother._id, 'children'].join('/'));
                }, function(){
                    Alerts.addError('Unable to save child.  Please review the form and try again.');
                });
        }
  });
