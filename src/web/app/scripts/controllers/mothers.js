'use strict';

angular.module('webApp')
  .controller('MothersCtrl', function ($scope) {
        function $mom(name, age, address)
        {
            return {
                name: name,
                age: age,
                address: address
            }
        }

        $scope.moms = [
            $mom("Betty Ford", 49, "134 Test Dr"),
            $mom("Jackie Singeton", 32, "555 Orange St"),
            $mom("Sara Smiler", 22, "23423 Long Name Blvd")
        ];
  });
