'use strict';
var servicename = 'Comment';

module.exports = function (app) {

    var dependencies = ['lodash', 'rx', '$log', app.name + '.Post', app.name + '.DSComment', '$q', 'moment', 'faker', 'Bluebird'];

    function service(_, rx, $log, Post, DSComment, $q, moment, faker, BPromise) {

        var create = function (input, createId) {
                if (!!input && input.author && input.message && input.parentPost) {
                    if (!!createId) {
                        input.id = faker.random.uuid();
                    }
                    input.createdAt = moment().toJSON();

                    return DSComment.create(input);
                } else {
                    return BPromise.reject('Comment#create: missing/incomplete input');
                }
        };

        var allCommentsForPost = function(postId){
            return DSComment.findAll({parentPost: postId}, {bypassCache: true});
        };

        return {
            create: create,
            allForPost: allCommentsForPost
        };

    }

    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
