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
            name: 'Souvik Singh',
            designation: 'Engineer',
            age: '22',
            joiningDate: '01/01/2015',
            leaveDate: " "
        }, {
            id: new Date().getTime(),
            name: 'Rajesh Singh',
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

        $scope.addEmployee = function() {
            var tempMonth = $scope.months.indexOf($scope.month) + 1;
            tempMonth = (tempMonth < 10) ? "0" + tempMonth : tempMonth;
            // console.log(tempMonth);
            if ($scope.employeeName !== '' && $scope.employeeDesignation !== '' && $scope.employeeAge !== '' &&
                $scope.month !== '' && $scope.year !== '') {
                employeeDetailsFactory.getEmployee().push({
                    id: new Date().getTime(),
                    name: $scope.employeeName,
                    designation: $scope.employeeDesignation,
                    age: $scope.employeeAge,
                    joiningDate: "01/" + tempMonth + "/" + $scope.year,
                    leaveDate: " "
                });
                $scope.employeeName = '';
                $scope.employeeDesignation = '';
                $scope.employeeAge = '';
                $scope.month = '';
                $scope.year = '';
                // console.log(employeeDetailsFactory.employee);
            } else {
                // console.log('Please Fillup All Fields');

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
    ])
    .controller('displayCtrl', ['$scope', '$window', 'employeeDetailsFactory', function($scope, $window, employeeDetailsFactory) {
        $scope.employeeList = employeeDetailsFactory.getEmployee();
        $scope.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        $scope.years = [2010, 2011, 2012, 2013, 2014, 2015];
        // console.log("Inside Controller");
        //$window.localStorage.setItem('selectedWindowPage', 1);
        //$window.localStorage.setItem('selectedWindowMonth', 'january');
        //$window.localStorage.setItem('selectedWindowYear', 2015);
        $scope.pageSize = 3;
        $scope.selectedPage = $window.localStorage.getItem('selectedWindowPage');
        // $scope.selectedMonth = $window.localStorage.getItem('selectedWindowMonth');
        // $scope.selectedYear = $window.localStorage.getItem('selectedWindowYear');
        $scope.selectedMonth = 'january';
        $scope.selectedYear = 2015;

        $scope.selectPage = function(newPage) {
            $window.localStorage.setItem('selectedWindowPage', newPage);

            $scope.selectedPage = $window.localStorage.getItem('selectedWindowPage');
        };
        // $scope.changeMonth = function(month) {
        //     console.log("hello");
        //     $window.localStorage.setItem('selectedWindowMonth', month);
        //     $window.localStorage.setItem('selectedWindowPage', 1);
        //     $scopeselectedMonth = $window.localStorage.getItem('selectedWindowMonth');
        //     $scope.selectedPage = $window.localStorage.getItem('selectedWindowPage');
        // };
        // $scope.changeYear = function(year) {
        //     $window.localStorage.setItem('selectedWindowYear', year);
        //     $window.localStorage.setItem('selectedWindowPage', 1);

        //     $scope.selectedYear = $window.localStorage.getItem('selectedWindowYear');
        //     $scope.selectedPage = $window.localStorage.getItem('selectedWindowPage');
        // };

        $scope.delete = function(employee, month, year) {
            month = $scope.months.indexOf(month) + 1;
            for (var i = 0; i <= employeeDetailsFactory
                .getEmployee().length; i++) {
                if (employeeDetailsFactory.getEmployee()[i] === employee) {
                    employeeDetailsFactory.getEmployee()[i].leaveDate = month + "/" + "01/" + year;
                    console.log('leave date:--->', employeeDetailsFactory.getEmployee()[i].leaveDate);
                    //console.log($scope.$storage.employeeList);
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
            // console.log(typeof(list));
            // console.log(list, storageMonths, month, year);
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
                        alert("yo1");
                        filteredList.push(list[i]);

                    } else if ((leaveYear > year) || (leaveYear == year && leaveMonth > month)) {
                        alert("yo2");

                        filteredList.push(list[i]);
                    }

                } else if (new Date(list[i].joiningDate).getFullYear() == year) {
                    console.log('same year', year);
                    if ((new Date(list[i].joiningDate).getMonth() + 1) <= month) {
                        console.log('in month');
                        if (list[i].leaveDate === " ") {
                            alert("yo3");
                            filteredList.push(list[i]);
                        } else if (leaveYear > year || (leaveYear == year && leaveMonth > month)) {
                            console.log('in year graeter month');
                            alert("yo4");
                            filteredList.push(list[i]);
                        }

                    }

                }
            }
            console.log(filteredList);
            return filteredList;

        }
    })
