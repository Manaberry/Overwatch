'use strict';
manatools.controller('profileController', function($scope,$http,$timeout,loginService){
	$scope.setIcon = 'settings';
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
    $scope.getInfos = function(user){
    	$http({method: 'GET',cache:true, url: 'http://localhost/manatools/api/user/'+user}).success(function(data, status){
			$scope.rank = data[0].rank;
			$scope.btag = data[0].btag;
		}).error(function(data, status){});
    }

    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
    };
    $scope.enableEditor = function(infosSlot) {
    	$scope.focused = infosSlot;
      	$scope.editorEnabled = true;
      	if(infosSlot == 'btag'){
        	$scope.editableTitle = $scope.btag;
      	}
    };
    $scope.save = function(user) {
      var focus = $scope.focused;
      if(focus == 'btag'){
        $scope.btag = $scope.editableTitle;
      }
      var btag = $scope.btag;
      $http({method: 'POST',data: {btag:btag}, url: 'http://localhost/manatools/api/user/'+user}).success(function(data, status){
			$scope.disableEditor();
			$scope.updated = data[0];
			$scope.setIcon = 'check';
			$timeout(function(){
		        $scope.updated = null;
		        $scope.setIcon = 'settings';
		    }, 1500);
		}).error(function(data, status){});
      
    };
   
});