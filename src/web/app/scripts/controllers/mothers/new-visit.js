'use strict';

angular.module('webApp')
  .controller('MothersNewVisitCtrl', function ($scope, $injector, $routeParams, $location) {
        var Mother  =    $injector.get("Mother"),
            Visit   =    $injector.get("Visit"),
            Alerts  =    $injector.get("Alerts"),
            $accessor =  $injector.get("$accessor");

        $accessor($scope);

        $scope.visit = {
            moods: [],
            volunteers: []
        };

        //$scope.form = {}; //new FormValidation($scope, 'visitForm');


        $scope.save = function()
        {
            if(!$scope.form.isFormValid()) return;
            var visit = new Visit($scope.visit);

            visit.$save(
                {
                    mid: $scope.mother._id
                },
                function(){
                    Alerts.addSuccess('Visit was added successfully');
                    $location.path(['/mothers', $scope.mother._id, 'visits'].join('/'));
                }, function(){
                    Alerts.addError('Unable to save visit.  Please review the form and try again.');
                });
        }
  })
    .controller('MothersVisitFormCtrl', function ($scope, $injector, $routeParams, $location) {
        var FormValidation = $injector.get("FormValidationHelper"),
            Mother  =    $injector.get("Mother"),
            Visit   =    $injector.get("Visit"),
            Volunteer =  $injector.get("Volunteer"),
            Alerts  =    $injector.get("Alerts"),
            $accessor =  $injector.get("$accessor");

        $scope.set('commonMoods', [
            'Happy',
            'Energetic',
            'Tired',
            'Sad',
            'Angry'
        ]);

        $scope.isCurrentMoodValid = function(){
            var mood = $scope.get('currentMood');
            
            return mood && mood.name
                        && mood.name.length
                        && mood.mood
                        && mood.mood.length;
        }

        $scope.addMood = function()
        {
            if($scope.isCurrentMoodValid())
            {
                $scope.visit.moods.push($scope.currentMood);
                $scope.set('currentMood', {});
            }

        }

        $scope.removeMoodAt = function(index){
            $scope.visit.moods.splice(index, 1);
        }

        $scope.setMoodText = function(moodText)
        {
            $scope.set("currentMood.mood", moodText);
        }


        $scope.volunteers = Volunteer.search();

        $scope.set('currentMood', {});
        $scope.set('form', new FormValidation($scope, 'visitForm'))

        if(!$scope.mother)
            $scope.set('mother', Mother.get({id: $routeParams.id}));

        $scope.save = function(){


            $scope.$parent.save();
        }

    });

/**
 *  Angular service used to add a get/set/has method to a scope object
 *
 *  usage: $accessor($scope);
 *
 *      $scope.get('path.to.prop') or $scope.get('path.to.prop', 'default');
 *      $scope.set('path.to.prop', value) or $scope.set('path.to.prop', value, function(val){
 *          return value > val;
 *      });
 */
angular.module('webApp')
    .factory('$accessor', function($parse, $rootScope){
        function accessor(scope){


            /**
             *
             * @param ns
             * @param val |
             * @param conditional | Function
             * @returns {*}
             */
            scope.set = function(ns, val, conditional)
            {
                var args = Array.prototype.slice.call(arguments, 0);

                if(!angular.isString(ns)){
                    args.forEach(function(item){
                        if(angular.isArray(item))
                            scope.set.apply(scope, item);
                    });
                    return true;
                }

                var getter = $parse(ns);
                if(!conditional || (angular.isFunction(conditional) && conditional.call(scope, getter(scope)) !== false))
                    return getter.assign(scope, val);
                else
                    return false;
            }

            /**
             * Copy a map from one object to another or copy a signle
             * @param src
             * @param dst
             * @param defVal
             */
            scope.copy = function(src, dst, defVal){
                if(arguments.length == 1 && angular.isObject(arguments[0])){
                    scope.map(arguments[0], true);
                }else if(arguments.length > 1){
                    var val = angular.copy(scope.get(src, defVal));
                    scope.set(dst, val);
                }
            }

            /**
             * Map values from within the scope to other properties within the scope.
             * @param map
             * @param copy
             */
            scope.map = function(map, copy)
            {
                for(var getKey in map)
                {

                    var setKey = map[getKey];

                    var val = scope.get(getKey);

                    if(copy)
                        val = angular.copy(val);

                    if(angular.isObject(setKey)){
                        if(val === undefined) val = setKey.defaultValue;

                        scope.set(setKey.to, val, setKey["if"] || angular.noop);
                    }else{
                        scope.set(setKey, val);
                    }
                }
            }

            /**
             * Get the value of the current namespace within the scope
             * @param ns
             * @param defaultVal
             * @returns {*}
             */
            scope.get = function(ns, defaultVal)
            {
                var getter = $parse(ns);
                var val = getter(scope);

                return val !== undefined && val !== null ? val : defaultVal;
            }

            /**
             * Is the property set for the namespace passed
             * @param ns
             * @returns {boolean}
             */
            scope.has = function(ns){
                var val;
                return (val = scope.get(ns)) && val != undefined && val != null;
            }


        }

        return function factory(scope){

            return new accessor(scope);
        };
    });