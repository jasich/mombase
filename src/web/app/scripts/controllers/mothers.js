'use strict';

angular.module('webApp')
  .controller('MothersCtrl', function ($scope) {
        function $mock(name, age, address)
        {
            return {
                name: name,
                age: age,
                address: address
            }
        }

        $scope.moms = [
            $mock("Betty Ford", 49, "134 Test Dr"),
            $mock("Jackie Singeton", 32, "555 Orange St"),
            $mock("Sara Smiler", 22, "23423 Long Name Blvd")
        ];
  });
