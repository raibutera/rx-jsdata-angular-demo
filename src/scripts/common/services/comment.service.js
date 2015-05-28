'use strict';
var servicename = 'Comment';

module.exports = function (app) {

    var dependencies = ['lodash', 'rx', '$log', app.name + '.DSComment', 'Bluebird'];

    function service(_, rx, $log, DSComment, Bluebird) {
        var add = function (a, b) {
            return a + b;
        };

        return {
            add: add
        };

    }

    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
