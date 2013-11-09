'use strict';

angular.module('webApp')
  .service('Authentication', function Authentication( $rootScope, $location ) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    	function Login(){
    		$rootScope.isLoggedIn = true;
    		return $location.path("/");
    	}

    	function Logout(){
    		$rootScope.isLoggedIn = false;
    		return $rootScope.isLoggedIn
    	}

    	function IsLoggedIn(){
    		return $rootScope.isLoggedIn;
    	}

    	return{
    		Login: Login,
    		Logout: Logout,
    		IsLoggedIn: IsLoggedIn
    	}
  });
