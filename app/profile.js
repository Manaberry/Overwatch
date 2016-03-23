'use strict';
manatools.controller('profileController', function($scope,$http,$timeout,loginService){
	var connected=loginService.islogged();
            connected.then(function(msg){
            	$scope.online = msg.data[0];
            	$scope.o = msg.data[0].message;
            });
    $scope.getInfos = function(user){
    	$http({method: 'GET', url: 'http://localhost/manatools/api/user/'+user}).success(function(data, status){
		    $scope.theuser = data[0];
		    $scope.loaded = true;
		}).error(function(data, status){});
    };
	
	$scope.setIcon = 'settings';
	$scope.setAvatar = 'image';
	$scope.avatars = [
		{"id":0,"link":"avatar00.png"},
		{"id":1,"link":"avatar0.png"},
		{"id":2,"link":"avatar1.png"},
		{"id":3,"link":"avatar2.png"},
		{"id":4,"link":"avatar3.png"},
		{"id":5,"link":"avatar4.png"},
		{"id":6,"link":"avatar5.png"},
		{"id":7,"link":"avatar6.png"},
		{"id":8,"link":"avatar7.png"},
		{"id":9,"link":"avatar8.png"},
		{"id":10,"link":"avatar9.png"},
		{"id":11,"link":"avatar10.png"},
		{"id":12,"link":"avatar11.png"},
		{"id":13,"link":"avatar12.png"},
		{"id":14,"link":"avatar13.png"},
		{"id":15,"link":"avatar14.png"},
		{"id":16,"link":"avatar15.png"},
		{"id":17,"link":"avatar16.png"},
		{"id":18,"link":"avatar17.png"},
		{"id":19,"link":"avatar18.png"},
		{"id":20,"link":"avatar19.png"},
		{"id":21,"link":"avatar20.png"},
		{"id":22,"link":"avatar21.png"},
		{"id":23,"link":"avatar22.png"},
		{"id":24,"link":"avatar23.png"},
		{"id":25,"link":"avatar24.png"},
		{"id":26,"link":"avatar25.png"},
		{"id":27,"link":"avatar26.png"},
		{"id":28,"link":"avatar27.png"},
		{"id":29,"link":"avatar28.png"},
		{"id":30,"link":"avatar29.png"},
		{"id":31,"link":"avatar30.png"},
		{"id":32,"link":"avatar31.png"},
		{"id":33,"link":"avatar32.png"},
		{"id":34,"link":"avatar33.png"},
		{"id":35,"link":"avatar34.png"},
		{"id":36,"link":"avatar35.png"},
		{"id":37,"link":"avatar36.png"},
		{"id":38,"link":"avatar37.png"},
		{"id":39,"link":"avatar38.png"},
		{"id":40,"link":"avatar39.png"},
		{"id":41,"link":"avatar40.png"},
		{"id":42,"link":"avatar41.png"}
	];
	$scope.rankName  = {
                "1":"User",
                "6":"Blizzard Employee",
                "7":"MVP",
                "8":"Moderator",
                "9":"Technical Support",
                "10":"Administrator"
            };
	$scope.selectAvatar = function(){
		$scope.showAvatar = true;
	}
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
    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
      $scope.showAvatar = false;
    };
    $scope.enableEditor = function() {
    	$scope.editorEnabled = true;
    };
    $scope.set = function(link){
    	$scope.theuser.avatar = link.link;
    	$scope.save();
    };
    $scope.save = function() {
    	var theuser = $scope.theuser;
      	$http({method: 'POST',data: {btag:theuser.btag,avatar:theuser.avatar}, url: 'http://localhost/manatools/api/user/'+theuser.user_id}).success(function(data, status){
			$scope.disableEditor();
			$scope.updated = data[0];
			$scope.setIcon = 'check';
			$timeout(function(){
		        $scope.updated = null;
		        $scope.setIcon = 'settings';
		    }, 1000);
		}).error(function(data, status){});
    };
   
});