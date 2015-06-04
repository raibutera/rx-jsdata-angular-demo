'use strict';
var controllername = 'home';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.Post', '$log', '$scope', 'rx'];

    function controller(Post, $log, $scope, rx) {
        var vm = this;
        vm.controllername = fullname;

        vm.allPosts = [];



        function buildSubscription(){
            vm.allPostsStream = new rx.BehaviorSubject();

            vm.allPostsSubscription = vm.allPostsStream.subscribe(
                function(allPosts){
                    vm.allPosts = allPosts;
                },
                function(err){
                    $log.error('allPosts error', err);
                },
                function(){
                    throw new Error('allPostsStream is cold :x');
                }
            );

            rx.Observable.fromPromise(Post.all())
                .subscribe(
                    function(allPostsInitialState){
                        vm.allPostsStream.onNext(allPostsInitialState);
                    },
                    function(error){
                        vm.allPostsStream.onError(error);
                    }
                );
        }


        vm.newPostModel = {
            author: '',
            title: '',
            message: ''
        };

        function resetNewPostModel (){
            vm.newPostModel = {
                author: '',
                title: '',
                message: ''
            };
        }

        vm.createNewPost = function(newPost){
            return Post.create(newPost, true).then(function(newlyCreated) {
                resetNewPostModel();
                $log.debug('homeCtrl: created new post (id:' + newlyCreated.id + ')');
                return Post.all();
            }).then(function (updatedPostsState) {
                $log.debug('homeCtrl: there are now ' + updatedPostsState.length + ' posts');
                vm.allPostsStream.onNext(updatedPostsState);
            }).catch(function(error) {
                $log.error('homeCtrl: new post create error:', error);
            });
        };

        var activate = function(){
            $log.debug('activating HomeCtrl');
            buildSubscription();
        };

        activate();

        $scope.$on('$destroy', function(){
            $log.info('destroying HomeCtrl $scope');
            vm.allPostsSubscription.dispose();
        });
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
