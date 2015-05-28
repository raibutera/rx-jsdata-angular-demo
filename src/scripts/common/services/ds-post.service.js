'use strict';
var servicename = 'DSPost';

module.exports = function(app) {

    var dependencies = ['DS', 'lodash', 'rx', '$log'];

    function service(DS, _, rx, $log) {
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
