'use strict';
manatools.controller('communityController', function($scope,$location,$http,$routeParams,$timeout,loginService){
    var connected=loginService.islogged();
            connected.then(function(msg){
                $scope.logged = msg.data[0].success;
                $scope.admin = msg.data[0].admin;
                $scope.support = msg.data[0].support;
                $scope.poster = msg.data[0].status;
                $scope.beta = msg.data[0].beta;
            });
    $scope.talkPage = function(id) {
        $location.url('/community/'+id);
    };

});