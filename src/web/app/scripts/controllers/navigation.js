
angular.module('webApp')
  .controller('NavigationCtrl', function ($scope, $rootScope, $location) {
        $scope.menu = [
            {
                text: 'Mothers',
                url: '/mothers'
            },
            {
                text: 'Volunteers',
                url: '/volunteers'
            },
            {
                text: 'Users',
                url: '/users'
            }
        ];

        $scope.isActive = function(url)
        {
            var currentUrl = $location.path();
            return url == currentUrl;
        }

  });
