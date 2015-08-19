'use strict';

angular
    .module('app', [
        'ui.router',
        'ui.bootstrap'
    ])
    .service('employeeDetailsService', function() {
        this.employee = [{
            id: new Date().getTime(),
            name: 'Pritam Guha',
            designation: 'Engineer',
            age: '23',
            monthOfJoining: 'june',
            yearOfJoining: '2015'
        }, {
            id: new Date().getTime(),
            name: 'Dhiraj Singh',
            designation: 'Engineer',
            age: '22',
            monthOfJoining: 'august',
            yearOfJoining: '2014'
        }, {
            id: new Date().getTime(),
            name: 'Souvik Gupta',
            designation: 'Engineer',
            age: '23',
            monthOfJoining: 'june',
            yearOfJoining: '2015'
        }, {
            id: new Date().getTime(),
            name: 'Rahul Karmakar',
            designation: 'Engineer',
            age: '22',
            monthOfJoining: 'june',
            yearOfJoining: '2015'
        }, {
            id: new Date().getTime(),
            name: 'Pritam Guha',
            designation: 'Engineer',
            age: '23',
            monthOfJoining: 'june',
            yearOfJoining: '2015'
        }];
    })
    .controller('modalCntrl', function($scope, $modal, employeeDetailsService) {

        $scope.open = function() {
            var modalInstance = $modal.open({
                templateUrl: 'view/modal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {}
            });
        };
    })

.controller('ModalInstanceCtrl', function($scope, $modalInstance, employeeDetailsService) {
        $scope.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        $scope.years = [2010, 2011, 2012, 2013, 2014, 2015];
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.employeeName = '';
        $scope.employeeDesignation = '';
        $scope.employeeAge = '';
        $scope.month = '';
        $scope.year = '';

        $scope.addEmployee = function() {
            if ($scope.employeeName !== '' && $scope.employeeDesignation !== '' && $scope.employeeAge !== '' &&
                $scope.month !== '' && $scope.year !== '') {
                employeeDetailsService.employee.push({
                    id: new Date().getTime(),
                    name: $scope.employeeName,
                    designation: $scope.employeeDesignation,
                    age: $scope.employeeAge,
                    monthOfJoining: $scope.month,
                    yearOfJoining: $scope.year
                });
                $scope.employeeName = '';
                $scope.employeeDesignation = '';
                $scope.employeeAge = '';
                $scope.month = '';
                $scope.year = '';
                console.log(employeeDetailsService.employee);
            } else {
                console.log('Please Fillup All Fields');

            }
        };
    })
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
                templateUrl: 'view/form.html',
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
                templateUrl: 'view/addDetails.html',
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
]);
