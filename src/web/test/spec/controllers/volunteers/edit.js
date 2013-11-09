'use strict';

describe('Controller: VolunteersEditCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var VolunteersEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VolunteersEditCtrl = $controller('VolunteersEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
