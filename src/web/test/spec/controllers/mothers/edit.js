'use strict';

describe('Controller: MothersEditCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var MothersEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MothersEditCtrl = $controller('MothersEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
