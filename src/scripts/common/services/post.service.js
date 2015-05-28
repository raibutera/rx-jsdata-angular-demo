'use strict';
var servicename = 'Post';

module.exports = function (app) {

    var dependencies = ['lodash', 'rx', '$log', app.name + '.DSPost', '$q', 'moment', 'faker'];

    function service(_, rx, $log, DSPost, $q, moment, faker) {
        var all = new rx.BehaviorSubject();

        DSPost.findAll(null, {bypassCache: true}).then(function(success) {
          all.onNext(success);
        },
        function(error) {
          all.onError(error);
        });

        var updateState = function(input){
            // $log.debug('updating ' + servicename + ' BehaviourSubject with ', input);
            return all.onNext(input);
        };

        var create = function (input, createId) {
            var deferred = $q.defer();
                if (!!input && input.author && input.content && input.title) {
                    if (!!createId) {
                        input.id = faker.random.uuid();
                    }
                    input.createdAt = moment().toDate();

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
