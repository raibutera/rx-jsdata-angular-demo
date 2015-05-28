'use strict';
require('angular-ui-router');

var Bluebird = require('bluebird');
require('moment');
var _ = require('lodash');
var faker = require('faker');
var Rx = require('rx');
require('angular-rx');
require('localforage');
require('angular-localforage');
require('js-data');
require('js-data-localforage');

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'LocalForageModule', 'js-data', 'rx']);
    // inject:folders start

    // inject:folders end
    require('./config')(app);
    require('./run')(app);

    app.constant('lodash', _);
    app.constant('faker', faker);
    app.constant('moment', moment);
    app.constant('Bluebird', Bluebird);

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('home', {
                url: '/',
                template: require('./views/home.html')
            });
        }
    ]);

    return app;
};
