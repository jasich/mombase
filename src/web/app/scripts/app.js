'use strict';

angular.module('webApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTable',
  'ngRoute'
])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/mothers.html',
        controller: 'MothersCtrl',
        label: 'Home'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/mothers', {
        templateUrl: 'views/mothers.html',
        controller: 'MothersCtrl',
        label: 'Mothers'
      })
      .when('/mothers/new', {
        templateUrl: 'views/mothers/new.html',
        controller: 'MothersNewCtrl',
        label: 'New Mother'
      })
      .when('/mothers/edit/:id', {
        templateUrl: 'views/mothers/edit.html',
        controller: 'MothersEditCtrl',
        label: function(scope)
        {
            if(scope) return [scope.mother.firstName, scope.mother.lastName].join(' ');
            else return 'Edit Mother';
        }
      })
      .when('/mothers/:id', {
          templateUrl: 'views/mothers/edit.html',
          controller: 'MothersEditCtrl',
          label: function(scope)
          {
              if(scope && scope.mother) return [scope.mother.firstName, scope.mother.lastName].join(' ');
              else return 'Edit Mother';
          }
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        label: 'Users'
      })
      .when('/users/new', {
        templateUrl: 'views/users/new.html',
        controller: 'UsersNewCtrl',
        label: 'New User'
      })
      .when('/users/password', {
        templateUrl: 'views/users/password.html',
        controller: "ChangePasswordCtrl",
        label: "Change Password"
      })
      .when('/users/edit/:id', {
        templateUrl: 'views/users/edit.html',
        controller: 'UsersEditCtrl',
        label: 'Edit User'
      })
      .when('/volunteers', {
        templateUrl: 'views/volunteers.html',
        controller: 'VolunteersCtrl',
        label: 'Volunteers'
      })
      .when('/volunteers/new', {
        templateUrl: 'views/volunteers/new.html',
        controller: 'VolunteersNewCtrl',
        label: 'New Volunteer'
      })
      .when('/volunteers/edit/:id', {
        templateUrl: 'views/volunteers/edit.html',
        controller: 'VolunteersEditCtrl',
        label: 'Edit Volunteer'
      })
        .when('/volunteers/:id', {
            templateUrl: 'views/volunteers/edit.html',
            controller: 'VolunteersEditCtrl',
            label: 'Edit Volunteer'
        })
      .when('/match/:id', {
        templateUrl: 'views/match.html',
        controller: 'MatchCtrl',
        label: 'Find Match'
      })
      .when('/mothers/visits', {
        templateUrl: 'views/mothers/visits.html',
        controller: 'MothersVisitsCtrl'
      })
      .when('/mothers/:id/children', {
        templateUrl: 'views/mothers/children.html',
        controller: 'MothersChildrenCtrl',
        label: 'Children'
      })

      .when('/mothers/:id/children/new', {
        templateUrl: 'views/mothers/new-child.html',
        controller: 'MothersNewChildCtrl',
        label: 'New Child'
      })
      .when('/mothers/:id/children/edit/:cid', {
        templateUrl: 'views/mothers/edit-child.html',
        controller: 'MothersEditChildCtrl',
            label: function(scope)
            {
                if(scope && scope.currentChild) return [scope.currentChild.firstName, scope.currentChild.lastName].join(' ');
                else return 'Edit Child';
            }
      })
      .when('/mothers/:id/visits', {
        templateUrl: 'views/mothers/visits.html',
        controller: 'MothersVisitsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .config(['$provide', '$httpProvider', function($provide, $httpProvider) {
    /**
     * Define an interceptor to look at all response errors for a 401 -
     * if found, the location is sent to the login route and any user information
     * on rootScope and cookieStore will be removed
     */
    $provide.factory('AuthHttpInterceptor', ['$q', '$location', function($q, $location) {
      return {
        'responseError': function(rejection) {
          if (rejection.status && rejection.status == 401) {
            var deferred = $q.defer();
            $location.path('/login');
            return deferred.promise;
          }
          return $q.reject(rejection);
        }
      };
    }]);
    $httpProvider.interceptors.push('AuthHttpInterceptor');
  }])
  .run(['$rootScope', '$location', '$cookies', 'Authentication', function ($scope, $location,$cookies, Authentication) {
        var cookie = $cookies["connect.sid"];
        var user = Authentication.getCurrentUser();

        $scope.isLoggedIn = !!!!!!cookie && user;
        if($scope.isLoggedIn)
            $scope.user = user;

        $scope.Logout = function(){
          $scope.isLoggedIn = false;
          Authentication.setCurrentUser(false);
          if($cookies)
            delete $cookies["connect.sid"];
          return $location.path('/login');
        }

        $scope.$on('$routeChangeStart', function (event) {
          if(!($scope.isLoggedIn)){
            return $location.path('/login');
          }
        });

        if(!($scope.isLoggedIn)){
            return $location.path('/login');
        }
 }]);
