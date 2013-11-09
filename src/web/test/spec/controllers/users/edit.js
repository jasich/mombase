'use strict';

describe('Controller: UsersEditCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var UsersEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersEditCtrl = $controller('UsersEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
