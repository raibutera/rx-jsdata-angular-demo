'use strict';
var servicename = 'Post';

module.exports = function (app) {

    var dependencies = ['lodash', 'rx', '$log', app.name + '.DSPost', 'Bluebird', 'moment', 'faker', '$window'];

    function service(_, rx, $log, DSPost, Bluebird, moment, faker, $window) {
        var allSubject = new rx.BehaviorSubject([]);
        var existing = new rx.Observable.from(DSPost.findAll);

        var all = existing.merge(allSubject);

        var updateState = function(input){
            $log.debug('updating ' + servicename + ' BehaviourSubject with ', input);
            return allSubject.onNext(input);
        };

        var create = function (input, createId) {
            return new Promise(function (resolve, reject) {
                if (!!input && input.author && input.content && input.title) {
                    if (!!createId) {
                        input.id = faker.random.uuid();
                    }
                    input.createdAt = moment().toDate();

                    DSPost.create(input)
                        .then(function(createdPost){
                            DSPost.findAll().then(function(newState) {
                                updateState(newState);
                                resolve(createdPost);
                            },
                            function(error) {
                              reject(error);
                            });

                        }, function(err){
                            reject(err);
                        });
                } else {
                    reject('Post#create: missing/incomplete input');
                }
            });
        };

        var lorem = faker.lorem.sentence();
        var bs = faker.company.bs();

        create({author: faker.internet.email(), title: bs, content: lorem}, true).then(function(success) {
            $log.info('created fake', success);
        },
        function(error) {
            $log.error('could not create fake', error);
        });

        return {
            create: create,
            all: all,
            updateState: updateState
        };

    }

    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
