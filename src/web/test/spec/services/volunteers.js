'use strict';

describe('Service: Volunteers', function () {

  // load the service's module
  beforeEach(module('WebApp'));

  // instantiate service
  var Volunteers;
  beforeEach(inject(function (_Volunteers_) {
    Volunteers = _Volunteers_;
  }));

  it('should do something', function () {
    expect(!!Volunteers).toBe(true);
  });

});
