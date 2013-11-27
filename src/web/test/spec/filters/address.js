'use strict';

describe('Filter: address', function () {

  // load the filter's module
  beforeEach(module('webApp'));

  // initialize a new instance of the filter before each test
  var address;
  beforeEach(inject(function ($filter) {
    address = $filter('address');
  }));

  it('should return the input prefixed with "address filter:"', function () {
    var text = 'angularjs';
    expect(address(text)).toBe('address filter: ' + text);
  });

});
