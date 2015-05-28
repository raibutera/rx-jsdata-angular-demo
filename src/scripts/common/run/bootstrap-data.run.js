/**
 * bootstrapData
 * Description
 */

'use strict';

module.exports = function bootstrapData(app) {
    function _bootstrapData($log, Post) {
        $log.info('bootstrapping data');
    }

    _bootstrapData.$inject = ['$log', app.name + '.Post'];

    return app.run(_bootstrapData);
};
