'use strict';

angular.module('webApp')
  .service('AvailabilityCodes', function() {
    var codes = [
      {
        name: 'Any',
        value: 'Any'
      },
      {
        name: 'AM',
        value: 'AM'
      },
      {
        name: 'PM',
        value: 'PM'
      }];

    return codes;
  });
