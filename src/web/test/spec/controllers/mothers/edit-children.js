'use strict';

describe('Controller: MothersEditChildrenCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var MothersEditChildrenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MothersEditChildrenCtrl = $controller('MothersEditChildrenCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
