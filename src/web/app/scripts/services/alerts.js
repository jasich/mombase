'use strict';

angular.module('webApp')
  .service('Alerts', function Alerts($rootScope) {
        if(!$rootScope.alerts) $rootScope.alerts = [];

        return {
            clear: function()
            {
                $rootScope.alerts.length = 0;
            },
            add: function(txt, state)
            {
                this.clear();
                $rootScope.alerts.push({
                    text: txt,
                    state: state
                });
            },
            addSuccess: function(txt)
            {
                this.add(txt, 'success');
            },
            addError: function(txt)
            {
                this.add(txt, 'danger');
            },
            addInfo: function(txt)
            {
                this.add(txt, 'info');
            },
            addWarning: function(txt)
            {
                this.add(txt, 'warning');
            },
            removeAt: function(index)
            {
                if($scope.alerts.length > index){
                    var removed = $scope.alerts.splice(index, 1);
                    return removed.length ? removed[0] : removed;
                }
            }
        }
  });
