'use strict';
var servicename = 'DSPost';

module.exports = function (app) {

    var dependencies = ['DS', 'lodash', 'rx', '$log'];

    function service(DS, _, rx, $log) {
        return DS.defineResource({
            name: 'Post',
            idAttribute: 'id',
            endpoint: '/post',
            schema: {
                id: {
                    type: 'string',
                    nullable: false
                },
                author: {
                    type: 'string',
                    nullable: false,
                    minLength: 5,
                    maxLength: 64
                },
                content: {
                    type: 'string',
                    nullable: false,
                    minLength: 3,
                    maxLength: 140
                },
                title: {
                    type: 'string',
                    nullable: false,
                    minLength: 3,
                    maxLength: 100
                },
                createdAt: {
                    type: 'string',
                    nullable: false
                }
            },
            // basePath: 'http://myoverridingapp.com/api',
            beforeDestroy: function (resourceName, attrs, cb) {

                cb(null, attrs);
            },
            methods: {}
        });

    }

    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
