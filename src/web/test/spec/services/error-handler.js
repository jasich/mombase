'use strict';

describe('Service: ErrorHandler', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var ErrorHandler;
  beforeEach(inject(function (_ErrorHandler_) {
    ErrorHandler = _ErrorHandler_;
  }));

  it('should do something', function () {
    expect(!!ErrorHandler).toBe(true);
  });

});
