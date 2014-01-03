'use strict';

angular.module('webApp')
  .service('AvailabilityCodes', function() {
    var codes = [
      {
        name: 'Any',
        value: 0
      },
      {
        name: 'AM',
        value: 1
      },
      {
        name: 'PM',
        value: 2
      }];

    return codes;
  });
