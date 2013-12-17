'use strict';

angular.module('webApp')
  .filter('age', ["DateHelper", function (DateHelper) {
    return function (dateStr) {
      if(!dateStr)
        return ""

      var age = DateHelper.getAge(dateStr);
      var yText = age == 1 ? "year" : "years";
      return [age, yText, "old"].join(" ");
    };
  }]);
