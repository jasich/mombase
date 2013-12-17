'use strict';

angular.module('webApp')
  .filter('address', ["AddressHelper", function (AddressHelper) {
    return function (addr) {
      return AddressHelper.formatAddress(addr);
    };
  }]);
