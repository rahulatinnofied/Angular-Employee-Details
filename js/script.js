'use strict';
angular.module('app', ['ui.bootstrap'])
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
                resolve: {

                }
            });
        };
        // var val = [],
    //     array = (Object.keys(employeeDetailsService.employee[0]));
    // val.push(array);
    // console.log(array);
    // for (var i in employeeDetailsService.employee) {
    //     var tmp = [];
    //     for (var j in array) {
    //         tmp.push(employeeDetailsService.employee[i][array[j]]);
    //     }
    //     val.push(tmp);
    // }
    // var list = '<ul><li>' + val.join('</li><li>') + '</li></ul>';
    // $('#output').append(list);

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
});
