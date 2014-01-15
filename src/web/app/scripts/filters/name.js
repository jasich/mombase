'use strict';

angular.module('webApp')
  .filter('name', function () {
    return function (person) {

      if(person)
        return [person.firstName, person.lastName].join(' ')
      else
        return '--'
    };
  });
