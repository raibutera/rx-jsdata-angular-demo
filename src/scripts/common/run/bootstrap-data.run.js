/**
 * bootstrapData
 * Description
 */

'use strict';

module.exports = function bootstrapData(app){
    function _bootstrapData (wcDemoData, wcLog) {
        var LOG = wcLog.createForModule(app.name, 'run', 'bootstrapData')(true);

        wcDemoData.core.then(function(data) {
            LOG.debug('bootstrapped data');
        },
        function(error) {
          LOG.error('no data :x', error);
        });
    }

    _bootstrapData.$inject = [app.namespace.data + '.demoData', app.namespace.commonDemo + '.log'];

    return app.run(_bootstrapData);
};
