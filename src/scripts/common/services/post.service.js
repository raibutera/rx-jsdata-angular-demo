'use strict';
var servicename = 'Post';

module.exports = function(app) {

    var dependencies = ['lodash', 'rx', '$log', app.namespace + '.DSPost', 'Bluebird'];

    function service(_, rx, $log, DSPost, Bluebird) {
        var add = function(a, b) {
            return a + b;
        };

        return {
            add: add
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
