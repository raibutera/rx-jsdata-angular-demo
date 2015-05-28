'use strict';
var servicename = 'coreData';

module.exports = function(app) {
    var dependencies = ['lodash', 'rx', 'Bluebird', '$log', app.namespace + '.Comment', app.namespace + '.Post'];

    function service(_, rx, Bluebird, $log, Comment, Post) {
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
