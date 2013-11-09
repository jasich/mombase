'use strict';

describe('Controller: MothersNewCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var MothersNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MothersNewCtrl = $controller('MothersNewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
