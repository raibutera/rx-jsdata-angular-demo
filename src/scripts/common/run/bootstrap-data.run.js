/**
 * bootstrapData
 * Description
 */

'use strict';

module.exports = function bootstrapData(app) {
    function _bootstrapData($log, Post, Comment) {
        $log.info('bootstrapping data');
    }

    _bootstrapData.$inject = ['$log', app.name + '.Post', app.name + '.Comment'];

    return app.run(_bootstrapData);
};
