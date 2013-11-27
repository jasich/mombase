'use strict';

angular.module('webApp')
  .filter('gender', function () {
    return function (gender) {
        //gender is saved as boolean value (true = 'male', false = 'female')
        if(gender === undefined) return 'Not Specified';
        return gender ? 'Male' : 'Female';
    };
  });
