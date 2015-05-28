'use strict';

/**
 Purpose:
 * Configure the angular log extender (`angular-logex`)
 *
 Documentation:
 *  - [RxJS](https://github.com/Reactive-Extensions/RxJS)
 *  - [angular-rx](https://github.com/Reactive-Extensions/rx.angular.js)
 *  - [RxBook](http://xgrommx.github.io/rx-book/content/config/index.html)
*/

module.exports = function (app) {
    function configAngularRx(_, rx, Bluebird, $log) {
        rx.config.Promise = Bluebird;
    }

    configAngularRx.$inject = ['lodash', 'rx', 'Bluebird', '$log'];

    return app.run(configAngularRx);
};
