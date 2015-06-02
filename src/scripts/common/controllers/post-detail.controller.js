'use strict';
var controllername = 'postDetail';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['lodash', app.name + '.Post', '$log', '$scope', '$stateParams', app.name + '.Comment', app.name + '.DSComment', '$window'];

    function controller(_, Post, $log, $scope, $stateParams, Comment, DSComment, $window) {
        var vm = this;
        vm.controllername = fullname;

        vm.postInfo = {};
        vm.postComments = {
            all: []
        };

        var postId = $stateParams.postId;

        var allPostsStream;
        var commentsForPost;

        $window.postDetail = vm;
        $window.Comment = Comment;
        $window.DSComment = DSComment;

        function buildSubscriptions(){
            allPostsStream = Post.all.output
            .map(function(allPosts){
                return _.find(allPosts, {id: postId});
            })
            .subscribe(function(newState){
                            $log.info(fullname + ' got Post ', newState);
                            vm.postInfo = newState;
                        },
                        function(err){
                            $log.error(fullname + ' got Post state ERROR #: ', err);
                        },
                        function(completed){
                            $log.error(fullname + ' Post COMPLETED', completed);
                        }
                    );

            var commentsSource = Comment.allCommentsForPost(postId);
            commentsSource.bootstrap(postId);

            commentsForPost = commentsSource.output.subscribe(
                function(next){
                    if(next){
                        $log.info(fullname + ' got Comments ', next);
                        vm.postComments.all = next;
                    }
                },
                function(err){
                    $log.error(fullname + ' get Comments error', err);
                },
                function(completed){
                    $log.error(fullname + ' Comments COMPLETED', completed);
                }
            );
        }


        vm.newCommentModel = {
            parentPost: postId,
            author: '',
            message: ''
        };

        var reset = function resetNewCommentModel (){
            vm.newCommentModel = {
                parentPost: postId,
                author: '',
                message: ''
            };
        };

        vm.createNewComment = function(newComment){
            return Comment.create(newComment, true).then(function(newlyCreated) {
                reset();
                $log.debug('postDetailCtrl: created new comment (id:' + newlyCreated.id + ')');
            },
            function(error) {
                $log.error('postDetailCtrl: new comment create error:', error);
            });
        };

        var activate = function(){
            $log.debug('activating postDetailCtrl');
            buildSubscriptions();
        };

        activate();

        $scope.$on('$destroy', function(){
            $log.info('destroying postDetailCtrl $scope');
            allPostsStream.dispose();
            commentsForPost.dispose();
        });
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
