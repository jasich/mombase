'use strict';

describe('Service: Messenger', function () {

  // load the service's module
  beforeEach(module('WebApp'));

  // instantiate service
  var Messenger;
  beforeEach(inject(function (_Messenger_) {
    Messenger = _Messenger_;
  }));

  it('should do something', function () {
    expect(!!Messenger).toBe(true);
  });

});
