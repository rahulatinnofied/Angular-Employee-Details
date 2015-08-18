'use strict';
angular.module('app', [])
    .controller('myController', ['$scope', function($scope) {
        $scope.months = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
        $scope.years = [2010, 2011, 2012, 2013, 2014, 2015];
    }]);
