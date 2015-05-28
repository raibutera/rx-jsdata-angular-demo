'use strict';

/**
 * from https://github.com/angular/angular.js/blob/master/docs/content/guide/production.ngdoc
 *
 * ## Disabling Debug Data
 *
 * By default AngularJS attaches information about binding and scopes to DOM nodes,
 * and adds CSS classes to data-bound elements:
 *
 * - As a result of `ngBind`, `ngBindHtml` or `{{...}}` interpolations, binding data and CSS class
 * `ng-binding` are attached to the corresponding element.
 *
 * - Where the compiler has created a new scope, the scope and either `ng-scope` or `ng-isolated-scope`
 * CSS class are attached to the corresponding element. These scope references can then be accessed via
 * `element.scope()` and `element.isolateScope()`.
 *
 * Tools like [Protractor](https://github.com/angular/protractor) and
 * [Batarang](https://github.com/angular/angularjs-batarang) need this information to run,
 * but you can disable this in production for a significant performance boost with:
 *
 * ```js
 * myApp.config(['$compileProvider', function ($compileProvider) {
 *   $compileProvider.debugInfoEnabled(false);
 * }]);
 * ```
 *
 * If you wish to debug an application with this information then you should open up a debug
 * console in the browser then call this method directly in this console:
 *
 * ```js
 * angular.reloadWithDebugInfo();
 * ```
 *
 * The page should reload and the debug information should now be available.
 *
 * For more see the docs pages on {@link ng.$compileProvider#debugInfoEnabled `$compileProvider`}
 * and {@link angular.reloadWithDebugInfo `angular.reloadWithDebugInfo`}.
 *
*/

module.exports = function (app) {
    function configAngularCompiler(_, $compileProvider) {
        var inDevelopment = true;

        if(inDevelopment || _.isUndefined(inDevelopment) || _.isNull(inDevelopment)){
            $compileProvider.debugInfoEnabled(true);
            // console.log('angular debug info ENABLED');
        } else {
            $compileProvider.debugInfoEnabled(false);
            // console.log('angular debug info DISABLED');
        }
    }

    configAngularCompiler.$inject = ['lodash', '$compileProvider'];

    return app.config(configAngularCompiler);
};
