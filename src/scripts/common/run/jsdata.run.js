/**
 * setupJSDataAndAdapters
 * Description
 */

'use strict';

module.exports = function setupJSDataAndAdapters(app) {
    function _setupJSDataAndAdapters(DS, DSLocalForageAdapter, $log, $window, _) {
        $log.debug('setting up js-data localForage adapter and bootstrapping JSData models');
        DS.registerAdapter('DSLocalForageAdapter', DSLocalForageAdapter, {default: true});
    }

    _setupJSDataAndAdapters.$inject = ['DS', 'DSLocalForageAdapter', '$log', '$window', 'lodash'];

    return app.run(_setupJSDataAndAdapters);
};
