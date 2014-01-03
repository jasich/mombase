'use strict';

angular.module('webApp')
  .directive('commaSeparated', function ($parse) {
    return {
      priority: 100,
      link: function(scope, element, attrs){
        scope.$watch(attrs.ngModel, function(value) {
          if (!value)  { return; }
          // reformat whitespace
          value = value.replace(/\\t/g, ' '); // replace tabs with single space
          value = value.replace(/  /g, ' ');  // replace double spaces with a single space

          var results = [];
          var pieces = value.split(',');
          for (var i = 0; i < pieces.length; i++) {
            results.push(pieces[i].trim()); // Trim
          }

          var model = $parse(attrs.commaSeparated);
          model.assign(scope, results);
        });
      }
    };
  });
