'use strict';

angular.module('webApp')
  .service('Authentication', function Authentication( $rootScope, $location,$q, $cookieStore, $cookies, loginService ) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    	function Login(username, password){
    		var login = new loginService({username:username, password:password});
            var defer = $q.defer();

    		var result =login.$save(
                function(u){
                    if(u){
                        $rootScope.isLoggedIn = true;
                        setCurrentUser(u);
                        defer.resolve(u);
                        return $location.path('/');
                    }
    		    }, function(res){
                    setCurrentUser(null);
                    defer.reject(res);
                });

            return defer.promise;
    	}

    	function Logout(){
    		$rootScope.isLoggedIn = false;
            if($cookies)
                delete $cookies["connect.sid"];
            setCurrentUser(null);
    		return $rootScope.isLoggedIn
    	}

    	function IsLoggedIn(){
    		return $rootScope.isLoggedIn;
    	}

        function getCurrentUser(){
            return $rootScope.user || $cookieStore.get('currentUser');
        }

        function setCurrentUser(user)
        {
            $rootScope.user = user;
            if(user)
                $cookieStore.put('currentUser', user);
            else
                $cookieStore.remove('currentUser');

        }

    	return{
    		Login: Login,
    		Logout: Logout,
    		IsLoggedIn: IsLoggedIn,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser
    	}
  });
