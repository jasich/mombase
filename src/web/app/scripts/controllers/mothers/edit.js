'use strict';

angular.module('webApp')
  .controller('MothersEditCtrl', function ($scope) {
    $scope.mother = {
      "__v": 16,
      "_id": "527ee220c2f63cc762000006",
      "email": "pam@email.com",
      "firstName": "Pam",
      "lastName": "Smith",
      "primaryVolunteer": "",
      "visits": [],
      "volunteers": [],
      "address": {
        line1: "123 xy ave",
        city: "Grand Rapids",
        "state": "MI",
        "zip": 458278
      },
      "emergencyContact": {
        "firstName": "bill",
        "lastName": "clinton"
      },
      "pediatrition": [],
      "restrictions": {
        "pets": [],
        "allergies": [],
        "medications": []
      },
      "languages": [],
      "availability": [],
      "children": [{
        "firstName": "Tim",
        "lastName": "Smith",
        "gender": "Male",
        "age": 3,
        "receivingServices": true
      }, {
        "firstName": "Billy",
        "lastName": "Smith",
        "gender": "Male",
        "age": 8
      }]
    };
  });
