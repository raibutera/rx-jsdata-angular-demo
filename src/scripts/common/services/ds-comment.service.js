'use strict';
var servicename = 'DSComment';

module.exports = function (app) {

    var dependencies = ['DS', 'lodash', 'rx', '$log'];

    function service(DS, _, rx, $log) {
        return DS.defineResource({
            name: 'Comment',
            idAttribute: 'id',
            endpoint: '/comment',
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
                message: {
                    type: 'string',
                    nullable: false,
                    minLength: 3,
                    maxLength: 140
                },
                createdAt: {
                    type: 'date',
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
