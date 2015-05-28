'use strict';
var servicename = 'Post';

module.exports = function (app) {

    var dependencies = ['lodash', 'rx', '$log', app.name + '.DSPost', 'Bluebird', 'moment', 'faker'];

    function service(_, rx, $log, DSPost, Bluebird, moment, faker) {
        var create = function (input, createId) {
            return new Promise(function (resolve, reject) {
                if (!!input && input.author && input.content && input.title) {
                    if (!!createId) {
                        input.id = faker.random.uuid();
                    }
                    input.createdAt = moment().toDate();

                    resolve(DSPost.create(input));
                } else {
                    reject('Post#create: missing/incomplete input');
                }
            });
        };


        var fakesPromises = _.map([1, 2, 3, 4, 5], function (value, key, collection) {
            $log.debug('creating fake ' + value);
            var fake = {
                author: faker.internet.email(),
                content: faker.lorem.sentence(),
                title: faker.company.bs()
            };
            return create(fake, true);
        });


        Promise.settle(fakesPromises).then(function (results) {
            _.forEach(results, function (result, index, collection) {
                if (result.isFulfilled()) {
                    $log.debug('fake ' + index + ' fulfilled: ', result.value());
                } else if (result.isRejected()) {
                    $log.error('fake ' + index + ' rejected: ', result.reason());
                } else {
                    $log.error('fake ' + index + ' unknown!?: ', result);
                }
            });
        });

        return {
            create: create
        };

    }

    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
