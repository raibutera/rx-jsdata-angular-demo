'use strict';
require('angular-ui-router');

var Bluebird = require('bluebird');
var _ = require('lodash');
var faker = require('faker');
var Rx = require('rx');
require('angular-rx');
require('localforage');
require('angular-localforage');
require('js-data-schema');
require('js-data');
require('js-data-angular');
require('js-data-localforage');

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'rx', 'LocalForageModule', 'js-data']);
    // inject:folders start

    require('./services')(app);

    // inject:folders end
    require('./config')(app);
    require('./run')(app);

    app.constant('lodash', _);
    app.constant('faker', faker);
    app.constant('moment', require('moment'));
    app.constant('Bluebird', Bluebird);

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
            .state('home', {
                url: '/',
                template: require('./views/home.html')
            })
            .state('viewPost', {
                url: '/post/{postId}',
                template: require('./views/view-post.html')
            });
        }
    ]);

    return app;
};
