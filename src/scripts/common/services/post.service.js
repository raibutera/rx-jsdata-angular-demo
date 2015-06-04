'use strict';
var servicename = 'Post';

module.exports = function (app) {

    var dependencies = ['lodash', 'rx', '$log', app.name + '.DSPost', '$q', 'moment', 'faker', 'Bluebird'];

    function service(_, rx, $log, DSPost, $q, moment, faker, BPromise) {
        var all = function(){
            return  DSPost.findAll(null, {bypassCache: true});
        };

        var create = function (input, createId) {
            if (!!input && input.author && input.content && input.title) {
                if (!!createId) {
                    input.id = faker.random.uuid();
                }
                input.createdAt = moment().toJSON();

                return DSPost.create(input);
            } else {
                return BPromise.reject('Post#create: missing/incomplete input');
            }
        };

        function getPost(postId, options){
            return DSPost.find(postId, {bypassCache: true});
        }

        return {
            create: create,
            all: all,
            get: getPost
        };

    }

    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
