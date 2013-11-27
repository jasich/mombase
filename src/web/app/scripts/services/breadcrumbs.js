'use strict';

angular.module('webApp')

  .factory('breadcrumbs', function ($rootScope, $location, $route, $timeout) {
        var breadcrumbs = [],
            breadcrumbsService = {},
            routes = $route.routes,
            values = {},
            currentScope = $rootScope,
            config = {
                'EditMother': function(crumbs)
                {

                }
            };

        var generateBreadcrumbs = function() {
            breadcrumbs = [];
            currentScope = $route.current.scope;

            var pathElements = $location.path().split('/'),
                path = '';

            var getRoute = function(route) {
                angular.forEach($route.current.params, function(value, key) {
                    var re = new RegExp(value);
                    route = route.replace(re, ':' + key);
                });
                return route;
            };


            var getLabelFromFn = function(fn)
            {
                var scope = $route.current.scope || currentScope || $rootScope;
                return fn.call(window, scope);
            }

            var getLabel = function(params)
            {
                if(params.label)
                {
                    if(angular.isFunction(params.label)){
                        return getLabelFromFn(params.label);
                    }else{
                        return params.label;
                    }

                }
            }

            if (pathElements[1] == '') delete pathElements[1];
            angular.forEach(pathElements, function(el) {
                path += path === '/' ? el : '/' + el;
                var route = getRoute(path);

                if (routes[route] && routes[route].label) {
                    breadcrumbs.push({
                        route: routes[route],
                        getLabel: function(){
                            return getLabel(this.route || routes[route]);
                        },
                        label: getLabel(routes[route]),
                        path: path
                    });
                }
            });
        };

        // We want to update breadcrumbs only when a route is actually changed
        // as $location.path() will get updated immediately (even if route change fails!)
        $rootScope.$on('$routeChangeSuccess', function(event, current) {
            $timeout(function(){
                generateBreadcrumbs();
            },100);

        });

        breadcrumbsService.values = function(key, value)
        {
            switch(arguments.length){
                case 0 : return values;
                case 1 : return values[key];
                default:
                    if(value === undefined || value === false)
                        delete values[key];
                    else
                        values[key] = value;
            }
        }

        breadcrumbsService.getAll = function() {
            return breadcrumbs;
        };

        breadcrumbsService.getFirst = function() {
            return breadcrumbs[0] || {};
        };

        return breadcrumbsService;
  });
