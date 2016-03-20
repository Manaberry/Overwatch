'use strict';
manatools.controller('communityTalkController', function($scope,$http,$routeParams,$location,$timeout,loginService){
    var connected=loginService.islogged();
            connected.then(function(msg){
                $scope.logged = msg.data[0].status;
                $scope.admin = msg.data[0].admin;
                $scope.poster = msg.data[0].user;
                $scope.beta = msg.data[0].beta;
            });

    var talk = {
        method: 'GET',
        url: 'http://localhost/manatools/api/community/'+$routeParams.id,
    };
    $http(talk).success(function(data, status, headers, config){
        $scope.talk = data;
        $scope.status = status;
        $scope.currentPage = 0;
        $scope.postPerPage = 10;
        $scope.numberOfPages=function(){
            return Math.ceil($scope.talk.length/$scope.postPerPage);                
        }
    }).error(function(data, status, headers, config){
        $scope.talk = [{
            "id": "0",
            "poster_id": "0",
            "content": "There is no post yet. Feel free to start the discussion.<br> I'm the website's <b>Guard</b>, also knowed as <b>Energized Manafiend</b>, not a real person. I will disapear if you start posting."
        }];
        $scope.guardoff = function(){
            $scope.talk.splice(0, 1);
        };
    });


    $scope.talkResponse = function(content){
        $scope.disabled = true;
        var posterId = $scope.poster;
        var create = {
            method: 'POST',
            url: 'http://localhost/manatools/api/community',
            data: {topic: $routeParams.id,content: content,poster: posterId}
        };
        $http(create).success(function(data, status, headers, config){
            var c = $scope.talk.length + 1;
            $scope.talk.splice(0, 0, {content: create.data.content,
                poster_id: create.data.poster});
            $scope.showrep = false;
        }).error(function(data, status, headers, config){
            console.log(data, status);
        })
    };
    $scope.deleteTalkReponse = function(post){
        var idx = $scope.talk.indexOf(post);
        var del = {
            method: 'POST',
            url: 'http://localhost/manatools/api/delete/',
            data: {
                id: post.id
            }
        };
        $http(del).success(function(data, status, headers, config){
            $scope.status = data;
            $scope.talk.splice(idx, 1);
        }).error(function(status){})
    };
    $scope.timeoutResponse = function(post){
        var idx = $scope.talk.indexOf(post);
        var timeout = {
            method: 'GET',
            url: 'http://localhost/manatools/api/timeout/'+post.id
        };
        $http(timeout).success(function(data, status, headers, config){
            $scope.status = data;
        }).error(function(status){});
    };
});