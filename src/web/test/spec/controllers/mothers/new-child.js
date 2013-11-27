'use strict';

describe('Controller: MothersNewChildCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var MothersNewChildCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MothersNewChildCtrl = $controller('MothersNewChildCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
