'use strict';

describe('Service: Visit', function () {

  // load the service's module
  beforeEach(module('WebApp'));

  // instantiate service
  var Visit;
  beforeEach(inject(function (_Visit_) {
    Visit = _Visit_;
  }));

  it('should do something', function () {
    expect(!!Visit).toBe(true);
  });

});
