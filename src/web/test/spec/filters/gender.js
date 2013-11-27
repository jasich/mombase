'use strict';

describe('Filter: gender', function () {

  // load the filter's module
  beforeEach(module('webApp'));

  // initialize a new instance of the filter before each test
  var gender;
  beforeEach(inject(function ($filter) {
    gender = $filter('gender');
  }));

  it('should return the input prefixed with "gender filter:"', function () {
    var text = 'angularjs';
    expect(gender(text)).toBe('gender filter: ' + text);
  });

});
