/**
 * rjadCommonConfig
 * Description
 */

'use strict';

module.exports = function rjadCommonConfig(app){
    require('./localforage.config')(app);
    require('./jsdata.config')(app);
    require('./compile.config')(app);
    require('./angular-rx.config')(app);
};
