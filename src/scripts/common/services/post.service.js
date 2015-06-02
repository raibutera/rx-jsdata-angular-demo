'use strict';
var servicename = 'Post';

module.exports = function (app) {

    var dependencies = ['lodash', 'rx', '$log', app.name + '.DSPost', '$q', 'moment', 'faker', 'MagicStream'];

    function service(_, rx, $log, DSPost, $q, moment, faker, MagicStream) {
        var all = new MagicStream({
            'name': 'Posts',
            'source': function(input){
                return rx.Observable.fromPromise(DSPost.findAll(null, {bypassCache: true}));
            }
        });

        all.bootstrap();

        var updateState = function(input){
            // $log.debug('updating ' + servicename + ' BehaviourSubject with ', input);
            return all.updates.add(input);
        };

        var create = function (input, createId) {
            var deferred = $q.defer();
                if (!!input && input.author && input.content && input.title) {
                    if (!!createId) {
                        input.id = faker.random.uuid();
                    }
                    input.createdAt = moment().toJSON();

                    DSPost.create(input)
                        .then(function(createdPost){
                            DSPost.findAll(null, {bypassCache: true}).then(function(newState) {
                                updateState(newState);
                                deferred.resolve(createdPost);
                            },
                            function(error) {
                              deferred.reject(error);
                            });

                        }, function(err){
                            deferred.reject(err);
                        });
                } else {
                    deferred.reject('Post#create: missing/incomplete input');
                }
            return deferred.promise;
        };

        return {
            create: create,
            all: all,
            updateState: updateState
        };

    }

    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
