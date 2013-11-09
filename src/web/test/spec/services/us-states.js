'use strict';

describe('Service: UsStates', function () {

  // load the service's module
  beforeEach(module('WebApp'));

  // instantiate service
  var UsStates;
  beforeEach(inject(function (_UsStates_) {
    UsStates = _UsStates_;
  }));

  it('should do something', function () {
    expect(!!UsStates).toBe(true);
  });

});
