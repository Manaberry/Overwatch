'use strict';
manatools.controller('profileController', function($scope,$location,$http,$routeParams,$timeout,loginService){


	$scope.connected = 'Sign in';
	$scope.submit = function(user){
		loginService.login(user,$scope);
	};
	$scope.logout = function(){
		loginService.logout();
	};
	$scope.enter = function($event,user){
		if ($event.keyCode === 13) {
			loginService.login(user,$scope);
		};
	};
	var connected=loginService.islogged();
            connected.then(function(msg){
            	$scope.connected = msg.data[0];
            });

});