'use strict';

angular.module('webApp')
  .filter('address', function (AddressHelper) {
    return function (addr) {
      return AddressHelper.formatAddress(addr);
    };
  });
