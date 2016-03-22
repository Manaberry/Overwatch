'use strict';
var manatools = angular.module('manatools',['ngClipboard','ngAnimate','ngRoute','ngSanitize','ngCookies']);


manatools.directive('ngTooltip', function($http,$compile,$timeout){
	var url = 'http://localhost/manatools/api/heroes/';
  	return {
    	scope: {ngTooltip: '@'},
    	link: function(scope, element, attrs) {
	    	element.bind('mouseenter', function () {
	    		$('#tooltip').stop().fadeIn(300);
	    		$http({method: 'GET', cache: true, url: url + attrs.ngTooltip}).success(function(data, status, headers, config){
	    			scope.hero = data[0];
		        	$timeout(function(){
		        		scope.display = true;
		        	}, 100);

		    	});
                $('#tooltip').html('<div ng-if="display"><img class="heroAvatar skew" height=50 width=50 src="images/owheroes/{{hero.label}}.png"><span class="heroname"><span class="toolname">{{hero.name}}</span><span class="toolrole">{{hero.role}}</span></span><ul><li style="background:url(images/health.png) no-repeat;" class="health">{{hero.health}}</li><li style="background:url(images/abilities/{{hero.label}}/ability-1.png) no-repeat;">{{hero.ability1[0]}}<br><span class="dmg">{{hero.ability1[1]}}</span><span class="dmgoff">{{hero.ability1[2]}}</span><span class="duration">{{hero.ability1[3]}}</span></li><li style="background:url(images/abilities/{{hero.label}}/ability-2.png) no-repeat;">{{hero.ability2[0]}}<br><span class="dmg">{{hero.ability2[1]}}</span><span class="cooldown">{{hero.ability2[2]}}</span><span class="duration">{{hero.ability2[3]}}</span></li><li style="background:url(images/abilities/{{hero.label}}/ability-3.png) no-repeat;">{{hero.ability3[0]}}<br><span class="dmg">{{hero.ability3[1]}}</span><span class="cooldown">{{hero.ability3[2]}}</span><span class="duration">{{hero.ability3[3]}}</span></li><li style="background:url(images/abilities/{{hero.label}}/ability-4.png) no-repeat;">{{hero.ability4[0]}}<br><span class="dmg">{{hero.ability4[1]}}</span><span class="cooldown">{{hero.ability4[2]}}</span><span class="duration">{{hero.ability4[3]}}</span></li><li class="ability-u" style="background:url(images/abilities/{{hero.label}}/ability-u.png) no-repeat;">{{hero.abilityu[0]}}<br><span class="dmg">{{hero.abilityu[1]}}</span><span class="cooldown">{{hero.abilityu[2]}}</span><span class="duration">{{hero.abilityu[3]}}</span></li></ul></div>');
                $compile($('#tooltip').contents())(scope);
            });
            element.bind('mouseleave', function () {
	    		$('#tooltip').stop().fadeOut(0);
	    		$('#tooltip').html('');
            });
		}
	};
});
manatools.directive('ngMenu', function($http,$compile,$timeout){
  	return {
    	scope: {
    		ngMenu: '@'
    	},
    	templateUrl: 'app/elements/main-menu.html',
    	link: function(scope, element, attrs) {
	    	scope.linkHome = '#/';
	    	scope.linkHero = '#/heroes';
	    	scope.linkTeamBuilder = '#/teambuilder';
	    	scope.linkStrategyBuilder = '#/strategy';
	    	scope.linkCommunity = '#/community';
	    	scope.linkProfile = '#/profile';
	    	$http({method: 'GET', url: 'http://localhost/manatools/api/session/check'}).success(function(data, status){
							sessionService.set('manatools_v1', data[0].uid);
							scope.intolog = data;
							scope.connected = data[0];
							scope.details = data[0].message;
			    	}).error(function(data, status){
			    		scope.intolog = data;
			    		scope.connected = data[0];
			    		scope.details = data[0].message;
			    	});
		}
	};
});
manatools.directive('ngUser', function($http){
	var url = 'http://localhost/manatools/api/user/';
  	return {
    	restrict: 'EA',
    	scope: {
    		ngUser: '@'
    	},
    	template: '<div class="skew talk-poster ba-{{user.rank}}"><div class="rad img-crop"><img ng-src="http://media.manatools.com/avatar/{{user.avatar}}" class="poster-avatar"></div><span class="poster-name">{{user.username}}</span><span class="poster-name poster-status">{{rankName[user.rank]}}</span></div>',
    	link: function(scope, element, attrs) {
      		$http({method: 'GET', cache:true,url: url + attrs.ngUser}).success(function(data, status, headers, config){
	        	scope.user = data[0];
	        	console.log(data);
	    	});
	    	scope.rankName  = {
                "1":"User",
                "6":"Blizzard Employee",
                "7":"MVP",
                "8":"Moderator",
                "9":"Technical Support",
                "10":"Administrator"
            };
		}
	};
});
manatools.factory('loginService', function($http,$location,sessionService,$timeout,$cookies,$cookieStore){
	return {
		login:function(user,scope){
					scope.connect = null;
					$http({method: 'POST', url: 'http://localhost/manatools/api/session/login', data: user}).success(function(data, status){
							scope.connect = data[0].status;
							scope.o = data[0].message;
							sessionService.set('manatools_v1', data[0].uid);
							$timeout(function(){
								scope.intolog = data;
								scope.online = data[0];
							}, 1500);
							$timeout(function(){
								scope.connect = null;
							}, 3000);
			    	}).error(function(data, status){});
				},
		logout:function(scope){
			sessionService.destroy('manatools_v1');
			$cookieStore.remove('manatools_v1');
			$http({method: 'GET', url: 'http://localhost/manatools/api/session/destroy'}).success(function(data, status){
							scope.intolog = data;
							scope.online = data[0];
							scope.o = data[0].message;
							console.log(data[0]);
			    	}).error(function(data, status){});
		},
		islogged:function(){
			var $checkSessionServer=$http.get('http://localhost/manatools/api/session/check');
			return $checkSessionServer;
			//if(sessionService.get('user')) return true;
		},
		gotKey:function(){
			var accessKey = sessionService.get('accesskey');
			if (accessKey == null) {
				var accessKey = '0';
			};

			var keycheck = {
				method: 'POST',
				url: 'http://api.manatools.com/accesskey',
				data: {
					key:accessKey
				}
			}
			var $checkAccess=$http(keycheck);
			return $checkAccess;
			//if(sessionService.get('user')) return true;
		}
	}
});
manatools.factory('sessionService', function($http){
	return{
		set:function(key,value){
			return  sessionStorage.setItem(key,value);
		},
		get:function(key){
			return  sessionStorage.getItem(key);
		},
		destroy:function(key){
			$http.get('http://localhost/manatools/api/session/destroy');
			return  sessionStorage.removeItem(key);
		}
	}
});
manatools.directive('ngLastpost', function($http){
	var url = 'http://localhost/manatools/api/community/lastpost/';
  	return {
    	restrict: 'EA',
    	scope: {
    		ngLastpost: '@'
    	},
    	template: '<div ng-if="!nopost">No message yet</div><div ng-if="nopost">Last message <b>{{lastpost.date | fromNow}}</b></div>',
    	link: function(scope, element, attrs) {
      		$http({method: 'GET', cache:true, url: url + attrs.ngLastpost}).success(function(data, status, headers, config){
	        	if (data[0] == null) {
	        		scope.nopost = false;
	        	}else{
	        		scope.lastpost = data[0];
	        		scope.nopost = true;
	        	}
	    	});
		}
	};
});
manatools.filter('newlines', function () {
    return function(text) {
        return text.replace(/\n/g, '<br/>');
    }
}).filter('pageFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
}).filter('noHTML', function () {
    return function(text) {
        return text
                .replace(/&/g, '&amp;')
                .replace(/>/g, '&gt;')
                .replace(/</g, '&lt;');
    }
}).filter('hero', function () {
    return function(text) {
        return text
                .replace('*genji*', '<a ng-tooltip="genji">Genji</a>');
    }
}).filter('fromNow', function() {
  return function(date) {
    return moment(date).fromNow();
  }
});