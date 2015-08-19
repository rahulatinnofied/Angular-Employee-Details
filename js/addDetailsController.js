'use strict';
angular.module('app')
    .controller('addDetailsController', ['$scope', '$window', '$state',  
    	function($scope,$window,$state) {
    	console.log('addDetailsController');
        $scope.months = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
        $scope.years = [2010, 2011, 2012, 2013, 2014, 2015];
        $scope.logout = function(){
        	console.log('in logout');
        	$window.localStorage.removeItem('user-id');
        	$state.go('login');
        }
    }]);