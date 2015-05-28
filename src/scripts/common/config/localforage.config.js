/**
 * configureLocalForage
 * Description
 */

'use strict';

module.exports = function configureLocalForage(app){
    function _configureLocalForage ($localForageProvider) {
        var dataConfig = {
                    name: 'rx-jsdata-angular-demo',
                    storeName: 'keyvaluepairs',
                    description: 'demo data'
                };

        $localForageProvider.config({
                // driver      : 'localStorageWrapper', // if you want to force a driver
                name        : dataConfig.name, // name of the database and prefix for your data, it is "lf" by default
                // version     : 1.0, // version of the database, you shouldn't have to use this
                storeName   : dataConfig.storeName, // name of the table
                description : dataConfig.description
            });
    }

    _configureLocalForage.$inject = ['$localForageProvider'];

    return app.config(_configureLocalForage);
};
