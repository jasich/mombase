'use strict';

describe('Service: AvailabilityCodes', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var AvailabilityCodes;
  beforeEach(inject(function (_AvailabilityCodes_) {
    AvailabilityCodes = _AvailabilityCodes_;
  }));

  it('should do something', function () {
    expect(!!AvailabilityCodes).toBe(true);
  });

});
