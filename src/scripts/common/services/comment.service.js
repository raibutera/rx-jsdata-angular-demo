'use strict';
var servicename = 'Comment';

module.exports = function (app) {

    var dependencies = ['lodash', 'rx', '$log', app.name + '.Post', app.name + '.DSComment', '$q', 'moment', 'faker', 'MagicStream'];

    function service(_, rx, $log, Post, DSComment, $q, moment, faker, MagicStream) {

        var knownPosts = {

        };

        var allComments = new MagicStream({
            'name': 'Comments',
            'source': function(input){
                return rx.Observable.fromPromise(DSComment.findAll(null, {bypassCache: true}));
            }
        });

        allComments.bootstrap();

        var updateState = function(newest, all){
            // $log.debug('updating ' + servicename + ' BehaviourSubject with ', input);
            allComments.updates.add(all);
            var parent = newest.post;
            var id = newest.id;
            if(parent && _.isString(parent) && knownPosts[parent]){
                DSComment.findAll({'parentPost':{
                    '==': parent
                }},{bypassCache: true}).then(function(old) {
                  old = old || [];
                  old.push(newest);
                  return knownPosts[parent].updates.add(old);
                },
                function(error) {
                  $log.error(error);
                });
            }
        };

        var create = function (input, createId) {
            var deferred = $q.defer();
                if (!!input && input.author && input.message && input.parentPost) {
                    if (!!createId) {
                        input.id = faker.random.uuid();
                    }
                    input.createdAt = moment().toJSON();

                    DSComment.create(input)
                        .then(function(createdComment){
                            DSComment.findAll(null, {bypassCache: true}).then(function(newState) {
                                updateState(createdComment, newState);
                                deferred.resolve(createdComment);
                            },
                            function(error) {
                              deferred.reject(error);
                            });

                        }, function(err){
                            deferred.reject(err);
                        });
                } else {
                    deferred.reject('Comment#create: missing/incomplete input');
                }
            return deferred.promise;
        };

        var allCommentsForPost = function(postId){

            var allCommentsForPost = new MagicStream({
                name: 'Post' + postId + 'Comments',
                source: function(params){
                    return rx.Observable.fromPromise(DSComment.findAll({
                        'parentPost': {
                            '==': params
                        }
                    }, {bypassCache: true}));
                }
            });

            knownPosts[postId] = allCommentsForPost;

            return allCommentsForPost;
        };

        return {
            create: create,
            all: allComments,
            updateState: updateState,
            allCommentsForPost: allCommentsForPost,
            knownPosts: knownPosts
        };

    }

    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
