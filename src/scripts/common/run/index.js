/**
 * rjadCommonRun
 * Description
 */

'use strict';

module.exports = function rjadCommonRun(app) {
    require('./jsdata.run')(app);
    require('./bootstrap-data.run')(app);
};
