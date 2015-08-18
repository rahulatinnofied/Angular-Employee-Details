'use strict';
console.log('in top');
angular
    .module('app', [
        'ui.router'
    ])
    .controller('AppController', ['$scope', function($scope) {
        console.log('in appController', $scope);
    }])
    .run(function($rootScope, $injector) {
        console.log('in run');
        var $state = $injector.get("$state");
        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {
                // console.log($rootScope, $state);
                if (error === 'login') {
                    $state.go('addDetails');
                }
            }
        )
    })

.config(['$urlRouterProvider', '$stateProvider',
    function($urlRouterProvider, $stateProvider) {

        console.log('in config');
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'form.html',
                controller: 'formController',
                resolve: {
                    userId: function($q, $window) {
                        // $window.localStorage.setItem('userName', 'admin');
                        // $window.localStorage.setItem('userPwd', 'admin');
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
            })

    }
])
