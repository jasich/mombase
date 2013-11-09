'use strict';

angular.module('webApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
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
        controller: 'MothersCtrl'
      })
      .when('/mothers/new', {
        templateUrl: 'views/mothers/new.html',
        controller: 'MothersNewCtrl'
      })
      .when('/donors', {
        templateUrl: 'views/donors.html',
        controller: 'DonorsCtrl'
      })
      .when('/donors/new', {
        templateUrl: 'views/donors/new.html',
        controller: 'DonorsNewCtrl'
      })
      .when('/donors/edit', {
        templateUrl: 'views/donors/edit.html',
        controller: 'DonorsEditCtrl'
      })
      .when('/mothers/edit', {
        templateUrl: 'views/mothers/edit.html',
        controller: 'MothersEditCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .when('/users/new', {
        templateUrl: 'views/users/new.html',
        controller: 'UsersNewCtrl'
      })
      .when('/users/edit', {
        templateUrl: 'views/users/edit.html',
        controller: 'UsersEditCtrl'
      })
      .when('/volunteers', {
        templateUrl: 'views/volunteers.html',
        controller: 'VolunteersCtrl'
      })
      .when('/volunteers/new', {
        templateUrl: 'views/volunteers/new.html',
        controller: 'VolunteersNewCtrl'
      })
      .when('/volunteers/edit', {
        templateUrl: 'views/volunteers/edit.html',
        controller: 'VolunteersEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
