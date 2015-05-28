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

        var timesUpdated = 0;

        Post.all.subscribe(
            function(newState){
                timesUpdated++;
                $log.info(fullname + ' got Posts state update #' + timesUpdated + ': ', newState);
                vm.allPosts = newState;
            },
            function(err){
                timesUpdated++;
                $log.error(fullname + ' got Posts state ERROR #' + timesUpdated + ': ', err);
            },
            function(completed){
                $log.error(fullname + ' Posts COMPLETED', completed);
            }
        );


    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
