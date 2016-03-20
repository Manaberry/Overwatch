'use strict';
manatools.config(function($routeProvider,$controllerProvider,$locationProvider,$httpProvider){
	$routeProvider
	.when('/', {templateUrl:'app/home.html',controller:'homeController'})
	.when('/teambuilder', {templateUrl:'app/pick.html',controller:'pickController'})
	.when('/heroes', {templateUrl:'app/heroes.html',controller:'heroesController'})
	.when('/pick/:p1/:p2/:p3/:p4/:p5/:p6/:p10/:p20/:p30/:p40/:p50/:p60/:pickedmap/:name1/:name2/:name3/:name4/:name5/:name6', {templateUrl:'app/pick.html',controller:'pickReadController'})
	//forums
	.when('/profile', {templateUrl:'app/profile.html',controller:'profileController'})
	.when('/community', {templateUrl:'app/community.html',controller:'communityController'})
	.when('/community/:id', {templateUrl:'app/communityTalk.html',controller:'communityTalkController'})
	//error-otherwise
	.otherwise({ redirectTo:'/error', templateUrl:'app/error.html',controller:'errorController'});
	$locationProvider.html5Mode(false);
});
