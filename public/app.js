'use strict';

// Application Modules and Routing
angular
    .module('newApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'dashboardCtrl'
            })
            .when('/createstaff', {
                templateUrl: 'views/createstaff.html',
                controller: 'createstaffdCtrl'
            })
            .when('/portlocalnumber', {
                templateUrl: 'views/portlocalnumber.html',
                controller: 'portlocalnumberCtrl'
            })
            .when('/salesproposal', {
                templateUrl: 'views/salesproposal.html',
                controller: 'salesproposalCtrl'
            })
            .when('/tollfreeport', {
                templateUrl: 'views/tollfreeport.html',
                controller: 'tollfreeCtrl'
            })
            .when('/creditcardauth', {
                templateUrl: 'views/creditcardauth.html',
                controller: 'creditcardauthCtrl'
            })
            .when('/eftauthorration', {
                templateUrl: 'views/eftauthorration.html',
                controller: 'eftauthorrationCtrl'
            })
            .when('/porttollfreenumber', {
                templateUrl: 'views/porttollfreenumber.html',
                controller: 'porttollfreenumber'
            })
            .when('/quickInstruction', {
                templateUrl: 'views/quickInstruction.html',
                controller: 'quickInstructionCtrl'
            })
            .when('/starcode', {
                templateUrl: 'views/starcode.html',
                controller: 'starcodeCtrl'
            })
            .when('/usersprofile', {
                templateUrl: 'views/usersprofile.html',
                controller: 'usersprofileCrtl'
            })
            .when('/internationalrates', {
                templateUrl: 'views/internationalrates.html',
                controller: 'internationalratesCrtl'
            })
            .when('/domesticrates', {
                templateUrl: 'views/domesticrates.html',
                controller: 'domesticratesCrtl'
            })
            .when('/mydocs', {
                templateUrl: 'views/mydocs.html',
                controller: 'mydocsCrtl'
            })
            .when('/spindex', {
                templateUrl: 'views/spindex.html',
                controller: 'spindexCrtl'
            })
            .when('/plnindex', {
                templateUrl: 'views/plnindex.html',
                controller: 'plnindexCrtl'
            })
            .when('/ptfnindex', {
                templateUrl: 'views/ptfnindex.html',
                controller: 'ptfnindexCrtl'
            })
            .when('/ccaindex', {
                templateUrl: 'views/ccaindex.html',
                controller: 'ccaindexCrtl'
            })
            .when('/eftaindex', {
                templateUrl: 'views/eftaindex.html',
                controller: 'eftaindexCrtl'
            })
    });