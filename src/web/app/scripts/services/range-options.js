'use strict';

angular.module('webApp')
  .service('RangeOptions', function RangeOptions() {
    return [
      { label: '5 miles', value: '5', selected: true},
      { label: '10 miles', value: '10', selected: false},
      { label: '15 miles', value: '15', selected: false}
    ];
  });
