'use strict';

describe('Controller: MothersCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var MothersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MothersCtrl = $controller('MothersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
