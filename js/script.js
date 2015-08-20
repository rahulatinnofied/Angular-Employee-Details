'use strict';

angular
    .module('app', [
        'ui.router',
        'ui.bootstrap'
    ])
    .factory('employeeDetailsFactory', function() {
        var employee = [{
            id: new Date().getTime(),
            name: 'Pritam Guha',
            designation: 'Engineer',
            age: '23',
            joiningDate: '10/01/2012',
            leaveDate: " "
        }, {
            id: new Date().getTime(),
            name: 'Dhiraj Singh',
            designation: 'Engineer',
            age: '22',
            joiningDate: '01/01/2015',
            leaveDate: " "
        }, {
            id: new Date().getTime(),
            name: 'Souvik Gupta',
            designation: 'Engineer',
            age: '22',
            joiningDate: '01/01/2015',
            leaveDate: " "
        }, {
            id: new Date().getTime(),
            name: 'Rajesh Dan',
            designation: 'Engineer',
            age: '22',
            joiningDate: '04/01/2015',
            leaveDate: " "
        }];
        return {
            getEmployee: function() {
                return employee;
            }
        };
    })
    .controller('modalCntrl', function($scope, $modal, employeeDetailsFactory) {

        $scope.open = function() {
            var modalInstance = $modal.open({
                templateUrl: 'view/modal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {}
            });
        };
        // console.log(employeeDetailsFactory.getEmployee().length);
    })

.controller('ModalInstanceCtrl', function($scope, $modalInstance, employeeDetailsFactory) {
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
        $scope.clearErrorMessage = function() {
            $scope.errorMessage = '';
        };
        $scope.addEmployee = function() {
            var tempMonth = $scope.months.indexOf($scope.month) + 1;

            if ($scope.employeeName !== '' && $scope.employeeDesignation !== '' && $scope.employeeAge !== '' &&
                $scope.month !== '' && $scope.year !== '') {
                if (!/[\d+\.\d+]/g.test($scope.employeeAge) || $scope.employeeAge < 0) {
                    $scope.errorMessage = 'Age Must be positive number';
                } else {
                    var tempMonth = $scope.months.indexOf($scope.month) + 1;
                    employeeDetailsFactory.getEmployee().push({
                        id: new Date().getTime(),
                        name: $scope.employeeName,
                        designation: $scope.employeeDesignation,
                        age: $scope.employeeAge,
                        joiningDate: tempMonth + '/' + '01/' + $scope.year,
                        leaveDate: ' '
                    });
                    $scope.employeeName = '';
                    $scope.employeeDesignation = '';
                    $scope.employeeAge = '';
                    $scope.month = '';
                    $scope.year = '';
                    $scope.errorMessage = '';
                }
            } else {
                $scope.errorMessage = 'Please fillup all the fields';

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
                } else if (error === 'addDetails') {
                    $state.go('login');
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
                }).state('addDetails.employeeView', {
                    url: 'addDetails/employeeView/:page',
                    templateUrl: 'view/employeeDetails.html',
                    controller: 'displayCtrl'
                });
        }
    ])
    .controller('displayCtrl', ['$scope', '$state', '$stateParams', 'employeeDetailsFactory', function($scope, $state, $stateParams, employeeDetailsFactory) {
        $scope.employeeList = employeeDetailsFactory.getEmployee();
        $scope.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        $scope.years = [2010, 2011, 2012, 2013, 2014, 2015];
        $scope.pageSize = 3;
        $scope.selectedPage = $stateParams.page || 1;
        console.log("dsfsdfdsfdsfdsfdsfsdfsd", $scope.selectedPage);
        $scope.selectedMonth = 'december';
        $scope.selectedYear = 2015;

        $scope.selectPage = function(newPage) {
            console.log(newPage);
            $state.go('addDetails.employeeView', {
                page: newPage
            });

        };


        $scope.delete = function(employee, month, year) {
            month = $scope.months.indexOf(month) + 1;
            for (var i = 0; i <= employeeDetailsFactory
                .getEmployee().length; i++) {
                if (employeeDetailsFactory.getEmployee()[i] === employee) {
                    employeeDetailsFactory.getEmployee()[i].leaveDate = month + "/" + "01/" + year;
                    console.log('leave date:--->', employeeDetailsFactory.getEmployee()[i].leaveDate);
                    break;
                }
            }
        }


    }])
    .filter('range', function($filter) {
        return function(list, page, size) {

            var start_index = (page - 1) * size;

            if (list < start_index) {
                return [];
            } else {
                return $filter('limitTo')(list.slice(start_index), size);
            }


        }
    })
    .filter('pageCount', function() {
        return function(list, size) {
            if (angular.isArray(list)) {
                var result = [];
                for (var i = 0; i < Math.ceil(list.length / size); i++) {
                    result.push(i);
                }
                return result;
            } else {
                return list;
            }
        };
    })
    .filter('joiningDateFilter', function() {
        return function(list, storageMonths, month, year) {

            var leaveMonth = 0,
                leaveYear = 0,
                filteredList = [];
            if (month === '' || year === '') {
                return filteredList;
            }
            month = storageMonths.indexOf(month) + 1;
            year = parseInt(year);
            for (var i = 0; i < list.length; i++) {

                if (list[i].leaveDate !== ' ') {
                    leaveMonth = new Date(list[i].leaveDate).getMonth() + 1;
                    leaveYear = new Date(list[i].leaveDate).getFullYear();
                    console.log(list[i].leaveDate);
                }
                console.log(list[i].leaveDate, leaveYear, leaveMonth, year, month);


                if (new Date(list[i].joiningDate).getFullYear() < year) {
                    console.log('smaller year');
                    if (list[i].leaveDate === " ") {

                        filteredList.push(list[i]);

                    } else if ((leaveYear > year) || (leaveYear == year && leaveMonth > month)) {


                        filteredList.push(list[i]);
                    }

                } else if (new Date(list[i].joiningDate).getFullYear() == year) {
                    console.log('same year', year);
                    if ((new Date(list[i].joiningDate).getMonth() + 1) <= month) {
                        console.log('in month');
                        if (list[i].leaveDate === " ") {

                            filteredList.push(list[i]);
                        } else if (leaveYear > year || (leaveYear == year && leaveMonth > month)) {
                            console.log('in year graeter month');

                            filteredList.push(list[i]);
                        }

                    }

                }
            }
            console.log(filteredList);
            return filteredList;

        }
    })
