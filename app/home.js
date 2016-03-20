'use strict';
manatools.controller('homeController', function($scope,$location,$http){
	$scope.button = 'Set your team up';
	$scope.go = function(path){
		$location.url(path);
	}
});