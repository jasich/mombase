'use strict';

describe('Controller: MothersChildrenCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var MothersChildrenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MothersChildrenCtrl = $controller('MothersChildrenCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
