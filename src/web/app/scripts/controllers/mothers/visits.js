'use strict';

angular.module('webApp')
    .controller('MothersVisitsCtrl', function ($scope, $injector, $routeParams) {
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
                var visits = $scope.mother && $scope.mother.visits || [];
                var filteredData = TableHelper.search(visits, params);
                var orderedData = TableHelper.sort(filteredData, params);

                $defer.resolve(TableHelper.getPage(orderedData, params));
            }
        });

        $scope.$on('visit:delete', function(e, id) {
            Alerts.addSuccess("Child was deleted successfully")
            _.remove($scope.mother.visits, function(v) { return v._id == id });
            $scope.tableParams.reload();

        });
        $scope.$on('visit:delete:error', function(e, id) {
            Alerts.addError("Unable to delete the visit");
        });

        $scope.mother = Mother.get(
            {id: $routeParams.id},
            function(mom){
                $scope.tableParams.total((mom.visits || []).length);
                $scope.tableParams.reload();
            },
            function(){
                $scope.mother = {}
            });
    })
    .controller('VisitRowCtrl', function($rootScope, $scope, Visit) {

        $scope.delete = function() {
            var params = {id: $scope.visit._id, mid: $scope.mother._id};

            Visit.delete(params,
                _.partial(_.bind($scope.$emit,$scope), 'child:delete', params.id),
                _.partial(_.bind($scope.$emit, $scope), 'child:delete:error', $scope.kid)
            );
        }

    });
