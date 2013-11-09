'use strict';

angular.module('webApp')
  .directive('sameAs', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                var otherValue = scope.$eval(attrs.sameAs);
                if (viewValue === otherValue) {
                    ctrl.$setValidity('sameAs', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('sameAs', false);
                    return undefined;
                }
            });
        }
    };
  });
