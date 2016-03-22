'use strict';
manatools.controller('profileController', function($scope,loginService){


	$scope.submit = function(user){
		loginService.login(user,$scope);
	};
	$scope.logout = function(){
		loginService.logout($scope);
	};
	$scope.enter = function($event,user){
		if ($event.keyCode === 13) {
			loginService.login(user,$scope);
		};
	};
	var connected=loginService.islogged();
            connected.then(function(msg){
            	$scope.online = msg.data[0];
            	$scope.o = msg.data[0].message;
            });

});