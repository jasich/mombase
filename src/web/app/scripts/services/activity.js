'use strict';

angular.module('webApp')
    .service("$activity", function($rootScope){

        function Activity()
        {

        }

        Activity.prototype.start = function(name)
        {
            if(this[name] && !isNaN(this[name])){
                this[name] += 1;
            }else{
                this[name] = 1;
            }

            return this;
        }

        Activity.prototype.stop = function(name)
        {
            if(this[name] && !isNaN(this[name])){
                this[name] -= 1;
            }else{
                this[name] = 0;
            }

            return this;
        }

        if(!$rootScope.activity)
            $rootScope.activity = new Activity();

        return $rootScope.activity;
    })
    .directive('activityIndicator', function(){


        return {
            restrict: 'AE',
            scope: true,
            templateUrl: '/views/shared/activity-indicator.html',
            replace: true,
            link: function(scope, element, attr)
            {
                var attrName = 'activityIndicator';

                scope.show = function(txt)
                {
                    scope.text = txt || 'loading';

                    element.removeClass('off').addClass('on');
                }

                scope.hide = function()
                {
                    element.removeClass('on').addClass('off');
                }

                scope.evaluate = function(value){
                    var values = scope.$eval(value) || [];
                    var isActive = false;

                    for(var key in values){
                        var val = values[key];
                        if(val && !angular.isFunction(val)){
                            isActive = true;
                            scope.show(key);
                            break;
                        }
                    }
                    if(!isActive)
                        scope.hide();
                }

                scope.$watch(function($scope){
                    scope.evaluate(attr[attrName]);
                });

                attr.$observe(attrName, function(value) {
                    scope.evaluate(value);
                });
            }

        }
    });
