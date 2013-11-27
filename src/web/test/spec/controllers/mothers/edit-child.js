'use strict';

describe('Controller: MothersEditChildCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var MothersEditChildCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MothersEditChildCtrl = $controller('MothersEditChildCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
