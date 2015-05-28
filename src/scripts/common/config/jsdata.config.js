/**
 * configureJSData
 * Description
 */

'use strict';

module.exports = function configureJSData(app){
function _configureJSData (_, DSProvider, DSLocalForageAdapterProvider) {
        DSProvider.defaults.defaultAdapter = 'DSLocalForageAdapter';
        DSLocalForageAdapterProvider.defaults.basePath = 'JSData';
    }

    _configureJSData.$inject = ['lodash', 'DSProvider', 'DSLocalForageAdapterProvider'];

    return app.config(_configureJSData);
};
