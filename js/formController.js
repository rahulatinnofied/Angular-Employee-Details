angular
    .module('app')
    .controller('formController', ['$scope', '$window', function($scope, $window) {
        $scope.login = function() {
        	console.log('in form controller',$scope);
             if ($scope.userName === 'admin' && $scope.userPwd === 'admin') {
            	console.log('user name',$scope.userName);
            // 	console.log($scope.userPwd);
                // if ($scope.userName === 'admin' && $scope.userPwd === 'admin')
                    $window.localStorage.setItem('user-id', 'admin');
             }
            // $window.localStorage.setItem('user-id','abc');
        }

    }]);
