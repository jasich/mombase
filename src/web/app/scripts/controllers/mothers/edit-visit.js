'use strict';

angular.module('webApp')
  .controller('MothersEditVisitCtrl', function($scope, $injector, $routeParams,
    $location, breadcrumbs) {
    var FormValidation = $injector.get("FormValidationHelper"),
      Mother = $injector.get("Mother"),
      Visit = $injector.get("Visit"),
      Volunteer = $injector.get("Volunteer"),
      Alerts = $injector.get("Alerts"),
      $accessor = $injector.get("$accessor");

    $accessor($scope);

    $scope.visit = {}

    $scope.mother = Mother.get({
        id: $routeParams.id
      },
      function(mom) {
        var visit = _.find(mom.visits, {
          _id: $routeParams.vid
        });

        if (visit.startDate)
          visit.startDate = $scope.helpers.date.format(visit.startDate);

        if (visit.endDate)
          visit.endDate = $scope.helpers.date.format(visit.endDate);

        $scope.visit = visit;
      },
      function() {
        Alerts.addError('Unable to find the mother.');
      });

    $scope.save = function() {
      if (!$scope.form.isFormValid()) return;

      var visit = new Visit($scope.visit);

      visit.$update({
          mid: $scope.mother._id,
          id: $scope.visit._id
        },
        function() {
          Alerts.addSuccess('Visit information was updated successfully');
          $location.path(['/mothers', $scope.mother._id, 'visits'].join(
            '/'));
        },
        function(resp) {
          if (resp.data.name == "ValidationError") {
            var badFields = [];
            for (var field in resp.data.errors) {
              badFields.push(field);
            }

            $scope.errMessage =
              "Unable to save. Please fix the following fields: " +
              badFields.join(', ');
          } else {
            $scope.errMessage = "Unable to save. " + resp.data.message;
          }
        });
    }
  });
