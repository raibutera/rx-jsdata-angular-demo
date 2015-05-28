'use strict';
var controllername = 'home';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.Post', '$log', '$scope'];

    function controller(Post, $log, $scope) {
        var vm = this;
        vm.controllername = fullname;

        vm.allPosts = [];

        var allPostsStream;

        function buildSubscription(){
            allPostsStream = Post.all.subscribe(
                        function(newState){
                            $log.info(fullname + ' got Posts state update #:', newState);
                            vm.allPosts = newState;
                        },
                        function(err){
                            $log.error(fullname + ' got Posts state ERROR #: ', err);
                        },
                        function(completed){
                            $log.error(fullname + ' Posts COMPLETED', completed);
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
            },
            function(error) {
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
            allPostsStream.dispose();
        });
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
