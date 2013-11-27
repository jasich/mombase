'use strict';

describe('Filter: age', function () {

  // load the filter's module
  beforeEach(module('webApp'));

  // initialize a new instance of the filter before each test
  var age;
  beforeEach(inject(function ($filter) {
    age = $filter('age');
  }));

  it('should return the input prefixed with "age filter:"', function () {
    var text = 'angularjs';
    expect(age(text)).toBe('age filter: ' + text);
  });

});
