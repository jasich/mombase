'use strict';

angular.module('webApp')
  .controller('MothersChildrenCtrl', function ($scope, $injector, $routeParams) {
        var Mother = $injector.get("Mother"),
            Alerts = $injector.get("Alerts"),
            ngTableParams = $injector.get("ngTableParams"),
            TableHelper = $injector.get("TableHelper");

        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                firstName: 'asc'
            }
        }, {
            counts: [],
            total: 0, // length of data
            getData: function($defer, params) {
                var children = $scope.mother && $scope.mother.children || [];
                var filteredData = TableHelper.search(children, params);
                var orderedData = TableHelper.sort(filteredData, params);

                $defer.resolve(TableHelper.getPage(orderedData, params));
            }
        });

        $scope.$on('child:delete', function(e, id) {
            Alerts.addSuccess("Child was deleted successfully")
            _.remove($scope.mother.children, function(v) { return v._id == id });
            $scope.tableParams.reload();

        });
        $scope.$on('child:delete:error', function(e, id) {
            Alerts.addError("Unable to delete the child");
        });

        $scope.mother = Mother.get(
            {id: $routeParams.id},
            function(mom){
                $scope.tableParams.total((mom.children || []).length);
                $scope.tableParams.reload();
            },
            function(){
                $scope.mother = {}
            });
  })
    .controller('ChildRowCtrl', function($rootScope, $scope, Child) {

        $scope.delete = function() {
            var params = {id: $scope.kid._id, mid: $scope.mother._id};

            Child.delete(params,
                _.partial(_.bind($scope.$emit,$scope), 'child:delete', params.id),
                _.partial(_.bind($scope.$emit, $scope), 'child:delete:error', $scope.kid)
            );
        }

    });
