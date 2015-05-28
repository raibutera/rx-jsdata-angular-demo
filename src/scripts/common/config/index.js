/**
 * rjadCommonConfig
 * Description
 */

'use strict';

module.exports = function rjadCommonConfig(app){
    function _rjadCommonConfig (_, rx, $log) {

    }

    _rjadCommonConfig.$inject = ['lodash', 'rx', '$log'];

    return app.config(_rjadCommonConfig);
};
