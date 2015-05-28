/**
 * rjadCommonRun
 * Description
 */

'use strict';

module.exports = function rjadCommonRun(app){
    function _rjadCommonRun (_, rx, $log) {
        //todo
    }

    _rjadCommonRun.$inject = ['lodash', 'rx', '$log'];

    return app.run(_rjadCommonRun);
};
