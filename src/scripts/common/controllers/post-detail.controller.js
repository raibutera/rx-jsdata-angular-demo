'use strict';
var controllername = 'postDetail';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['lodash', app.name + '.Post', '$log', '$scope', '$stateParams', app.name + '.Comment', app.name + '.DSComment', '$window', 'rx'];

    function controller(_, Post, $log, $scope, $stateParams, Comment, DSComment, $window, rx) {
        var vm = this;
        vm.controllername = fullname;

        vm.postComments = {
            all: []
        };

        vm.postInfo = {};

        var postId = $stateParams.postId;

        function requestAllComments(postId){
            return Comment.allForPost(postId);
        }

        function updateViewState(posts){
            vm.postComments.all = posts;
        }

        function buildComments(){
            vm.commentStream = new rx.BehaviorSubject();

            vm.subscription = vm.commentStream.subscribe(
                function(newState){
                    console.log('postDetail: got a new state', newState);
                    updateViewState(newState);
                },
                function(err){
                    $log.error('postDetail buildSubscriptions error',err);
                },
                function(completed){
                  $log.error('postDetail subscription completed!?');
                }
            );

            // get initial state
            requestAllComments(postId).then(function(initialState) {
                console.log('got initial state', initialState);
                vm.commentStream.onNext(initialState);
            },
            function(error) {
                vm.commentStream.onError(error);
            });
        }

        function buildPost(){
            Post.get(postId).then(function(postInfo) {
                console.log('got post info', postInfo);
              vm.postInfo = postInfo;
            },
            function(error) {
              $log.error('buildPost error', error);
            });
        }

        function buildSubscriptions(){
            buildComments();
            buildPost();
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
                return Comment.allForPost(postId);
            }).then(function(newState){
                vm.commentStream.onNext(newState);
            });
        };

        var activate = function(){
            $log.debug('activating postDetailCtrl');
            buildSubscriptions();
        };

        activate();

        $scope.$on('$destroy', function(){
            $log.info('destroying postDetailCtrl $scope');
            vm.subscription.dispose();
        });
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
