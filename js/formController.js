'use strict';
/**
 * controller for login validation
 */
angular
    .module('app')
    .controller('formController', ['$scope', '$window', function($scope, $window) {
        $scope.loginErrorMessage = '';
        /**
         * login Checks the username and password and also checks the blank and
         * incorrect validation
         */
        $scope.login = function() {
            if ($scope.userName === 'admin' && $scope.userPwd === 'admin') {
                $window.localStorage.setItem('user-id', 'admin');
            } else {
                if ($scope.userName !== 'admin') {
                    $scope.loginErrorMessage = 'Invalid Username Or Password';
                    $scope.userName = '';
                    $scope.userPwd = '';
                } else {
                    $scope.loginErrorMessage = 'Invalid Password';
                    $scope.userPwd = '';
                }
            }
        };
        /**
         * clearMessage Clear the error message of validation 
         * when focused on input field
         */
        $scope.clearMessage = function() {
            $scope.loginErrorMessage = '';
        };
    }]);
