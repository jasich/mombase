'use strict';

angular.module('webApp')
  .filter('phone', function () {
    return function (phone) {
        if(!phone) return '';

        //normalize string and remove all unnecessary characters
        phone = phone.replace(/[^\d]/g, "");

        //check if number length equals to 10
        if (phone.length >= 10) {
            //reformat and return phone number
            return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        }

        return phone;
    };
  });
