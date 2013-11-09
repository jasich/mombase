'use strict';

describe('Controller: VolunteersCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var VolunteersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VolunteersCtrl = $controller('VolunteersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
