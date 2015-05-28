'use strict';

module.exports = function(app) {
    // inject:start
    require('./home.controller')(app);
    require('./post-detail.controller')(app);
    // inject:end
};