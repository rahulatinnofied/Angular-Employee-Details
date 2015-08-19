'use strict';
angular
    .module('app', [
        'ui.router',
        'ui.bootstrap'
    ])

.run(function($rootScope, $injector) {
    console.log('in run');
    var $state = $injector.get("$state");
    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error) {
            if (error === 'login') {
                $state.go('addDetails');
            }
        }
    );
})

.config(['$urlRouterProvider', '$stateProvider',
        function($urlRouterProvider, $stateProvider) {

            $urlRouterProvider.otherwise('/login');
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'form.html',
                    controller: 'formController',
                    resolve: {
                        userId: function($q, $window) {
                            var deferred = $q.defer();
                            var userId = $window.localStorage.getItem('user-id');
                            if (userId) {
                                deferred.reject('login');
                            } else {
                                deferred.resolve();
                            }

                            return deferred.promise;
                        }
                    }

                })
                .state('addDetails', {
                    url: '/addDetails',
                    templateUrl: 'addDetails.html',
                    controller: 'addDetailsController',
                    resolve: {
                        userId: function($q, $window) {
                            var deferred = $q.defer();
                            var userId = $window.localStorage.getItem('user-id');
                            if (userId) {
                                deferred.resolve();

                            } else {
                                deferred.reject('addDetails');

                            }

                            return deferred.promise;
                        }
                    }
                });

        }
    ])
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
    })
    .controller('addDetailsController', ['$scope', '$window', '$state',  
        function($scope,$window,$state) {
        console.log('addDetailsController');
        $scope.months = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
        $scope.years = [2010, 2011, 2012, 2013, 2014, 2015];
        $scope.logout = function(){
            console.log('in logout');
            $window.localStorage.removeItem('user-id');
            $state.go('login');
        };
    }]);
