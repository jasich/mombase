'use strict';

describe('Service: RangeOptions', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var RangeOptions;
  beforeEach(inject(function (_RangeOptions_) {
    RangeOptions = _RangeOptions_;
  }));

  it('should do something', function () {
    expect(!!RangeOptions).toBe(true);
  });

});
