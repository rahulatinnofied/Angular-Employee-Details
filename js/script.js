'use strict';
angular.module('app', ['ui.bootstrap'])

.controller('modalCntrl', function($scope, $modal) {

    $scope.open = function() {
        var modalInstance = $modal.open({
            templateUrl: 'view/modal.html',
            controller: 'ModalInstanceCtrl',
            resolve: {

            }
        });
    };
})

.controller('ModalInstanceCtrl', function($scope, $modalInstance) {
    $scope.months = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
    $scope.years = [2010, 2011, 2012, 2013, 2014, 2015];
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
