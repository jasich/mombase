'use strict';

angular.module('webApp')
  .directive('confirmClick', function () {
    return {
        priority: 100,
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            element.bind('click', function(e){
                var message = attrs.confirmClick;
                if(message && !confirm(message)){
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });
        }
    };
  });
