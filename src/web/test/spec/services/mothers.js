'use strict';

describe('Service: Mothers', function () {

  // load the service's module
  beforeEach(module('WebApp'));

  // instantiate service
  var Mothers;
  beforeEach(inject(function (_Mothers_) {
    Mothers = _Mothers_;
  }));

  it('should do something', function () {
    expect(!!Mothers).toBe(true);
  });

});
