'use strict';
var servicename = 'placeholders';

module.exports = function(app) {

    var dependencies = ['lodash', 'faker', 'moment', '$log', app.name + '.Post', app.name + '.Comment'];

    function service(_, faker, moment, $log, Post, Comment) {
        var fakesPromises = _.map([1, 2, 3, 4, 5], function (value, key, collection) {
            $log.debug('creating fake ' + value);
            var fake = {
                author: faker.internet.email(),
                content: faker.lorem.sentence(),
                title: faker.company.bs()
            };
            return Post.create(fake, true);
        });


        Promise.settle(fakesPromises).then(function (results) {
            _.forEach(results, function (result, index, collection) {
                if (result.isFulfilled()) {
                    $log.debug('fake ' + index + ' fulfilled: ', result.value());
                    Post.updateState(result.value());
                } else if (result.isRejected()) {
                    $log.error('fake ' + index + ' rejected: ', result.reason());
                } else {
                    $log.error('fake ' + index + ' unknown!?: ', result);
                }
            });
        });

        return {

        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
