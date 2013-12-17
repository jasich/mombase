'use strict';


angular.module('webApp')
    .controller('AppCtrl', ["$scope", "$rootScope", "$injector", "breadcrumbs", function ($scope, $rootScope, $injector, breadcrumbs) {
        /**
         *  Reusable form data that can be used from any form within the
         *  application.  Mostly used for select dropdowns and other form items.
         */
        $scope.formData = {
            states: $injector.get("UsStates"),
            availabilityCodes: $injector.get("AvailabilityCodes"),
            langCodes: $injector.get("LanguageCodes"),
            genders: [
                {
                    name: "Male",
                    value: true
                },
                {
                    name: "Female",
                    value: false
                }
            ]
        };

        $scope.breadcrumbs = breadcrumbs;


        //end of form data

        /**
         *  Reusable helpers that can be used throught the application.
         */
        $scope.helpers = {
            address: $injector.get("AddressHelper"),
            date: $injector.get("DateHelper")
        }

    }]);