'use strict';

angular.module('webApp')

  .controller('MothersCtrl', ["$scope", "$injector", "Mother", "Alerts", "ngTableParams", "$filter", "$activity", function ($scope, $injector, Mother, Alerts, ngTableParams, $filter, $activity) {

    var TableHelper = $injector.get("TableHelper");

    $scope.mothers = [];

    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10,
        sorting: {
            firstName: 'asc'
        }
    }, {
        counts: [],
        total: $scope.mothers.length, // length of data
        getData: function($defer, params) {
            var filteredData = TableHelper.search($scope.mothers, params);
            var orderedData = TableHelper.sort(filteredData, params);

            $defer.resolve(TableHelper.getPage(orderedData, params));
        }
    });

    $scope.load = function()
    {
        var params = {
            take: 100
        }
        $activity.start("loading");
        Mother.search(
            params,
            function(data){
                $activity.stop("loading");
                $scope.mothers = data;
                $scope.tableParams.total($scope.mothers.length);
                $scope.tableParams.reload();
            },
            function(){
                $activity.stop("loading");
                $scope.tableParams.total(0);
            });
    }
    //load mothers
    $scope.load();

    $scope.$on('mother:delete', function(e, id) {
      Alerts.addSuccess("Mother was deleted successfully")
      _.remove($scope.mothers, function(v) { return v._id == id });
      $scope.tableParams.reload();

    });
    $scope.$on('mother:delete:error', function(e, id) {
      Alerts.addError("Unable to delete the mother");
    });
  }])
  .controller('MotherRowCtrl', ["$rootScope", "$scope", "Mother", "AddressHelper", function($rootScope, $scope, Mother, AddressHelper) {
    $scope.address = function() {
      $scope.mother.address || ($scope.mother.address = {});

      return AddressHelper.formatAddress($scope.mother.address);
    };

    $scope.delete = function() {
      Mother.delete({id:$scope.mother._id},
        _.partial(_.bind($scope.$emit,$scope), 'mother:delete', $scope.mother._id),
        _.partial(_.bind($scope.$emit, $scope), 'mother:delete:error', $scope.mother)
      );
    }

    $scope.store = function() {
      $rootScope.mother = $scope.mother;
    };
  }]);
