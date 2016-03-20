'use strict';
manatools.controller('pickController', function($scope,$location,$http,$routeParams,$timeout){

  $http.get('app/dataOW.json').then(function(res){
    $scope.maps = res.data[0]['maps'];
    $scope.side = res.data[0]['side'];
	});

  $http.get('http://localhost/manatools/api/heroes').success(function(data, status, headers, config){
            $scope.heroes = data;
        }).error(function(data, status, headers, config){
            console.log(data)
        });
   
  
  $scope.focused = null;
  $scope.player1 = '-';
  $scope.player2 = '-';
  $scope.player3 = '-';
  $scope.player4 = '-';
  $scope.player5 = '-';
  $scope.player6 = '-';
  $scope.map = {"id":10,"label":"nomap","name":"Basic line up"};

    $scope.editorEnabled = false;
    $scope.enableEditor = function(playerSlot) {
      $scope.focused = playerSlot;
      $scope.editorEnabled = true;
      $scope.editableTitle = $scope.player1;
      if(playerSlot == 'player1'){
        $scope.editableTitle = $scope.player1;
      }
      if(playerSlot == 'player2'){
        $scope.editableTitle = $scope.player2;
      }
      if(playerSlot == 'player3'){
        $scope.editableTitle = $scope.player3;
      }
      if(playerSlot == 'player4'){
        $scope.editableTitle = $scope.player4;
      }
      if(playerSlot == 'player5'){
        $scope.editableTitle = $scope.player5;
      }
      if(playerSlot == 'player6'){
        $scope.editableTitle = $scope.player6;
      }
    };

    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
    };

    $scope.save = function() {
      var focus = $scope.focused;
      if(focus == 'player1'){
        $scope.player1 = $scope.editableTitle;
      }
      if(focus == 'player2'){
        $scope.player2 = $scope.editableTitle;
      }
      if(focus == 'player3'){
        $scope.player3 = $scope.editableTitle;
      }
      if(focus == 'player4'){
        $scope.player4 = $scope.editableTitle;
      }
      if(focus == 'player5'){
        $scope.player5 = $scope.editableTitle;
      }
      if(focus == 'player6'){
        $scope.player6 = $scope.editableTitle;
      }
      $scope.disableEditor();
    };
  
  /* PLAYERS DETAILS */
  $scope.p1 = {"id":21,"label":"nopick","name":"No Hero","role":"nope"};
  $scope.p2 = {"id":21,"label":"nopick","name":"No Hero","role":"nope"};
  $scope.p3 = {"id":21,"label":"nopick","name":"No Hero","role":"nope"};
  $scope.p4 = {"id":21,"label":"nopick","name":"No Hero","role":"nope"};
  $scope.p5 = {"id":21,"label":"nopick","name":"No Hero","role":"nope"};
  $scope.p6 = {"id":21,"label":"nopick","name":"No Hero","role":"nope"};
  $scope.p10 = {"id":21,"label":"nopick","name":"No Hero","role":"nope"};
  $scope.p20 = {"id":21,"label":"nopick","name":"No Hero","role":"nope"};
  $scope.p30 = {"id":21,"label":"nopick","name":"No Hero","role":"nope"};
  $scope.p40 = {"id":21,"label":"nopick","name":"No Hero","role":"nope"};
  $scope.p50 = {"id":21,"label":"nopick","name":"No Hero","role":"nope"};
  $scope.p60 = {"id":21,"label":"nopick","name":"No Hero","role":"nope"};
 
  $scope.share = function(){
    $scope.sharePanel = true;
    $('header,.slot,.share,.hide').addClass('blur');
  }
  $scope.close = function(){
    $scope.picking = false;
    $scope.sharePanel = false;
    $scope.pickingMap = false;
    if ($('header,.slot,.share,.hide').hasClass('blur')) {
          $('header,.slot,.share,.hide').removeClass('blur');
    };
  }
  $scope.pickHeroes = function(playerSlot){
    $scope.picking = true;
    $scope.playerSlot = playerSlot;
    $('header,.slot,.share,.hide').addClass('blur');
  }
  $scope.pickMap = function(){
    $scope.pickingMap = true;
    $('header,.slot,.share,.hide').addClass('blur');
  }
  $scope.setMap = function(map){
    $scope.pickingMap = false;
    $scope.map = map;
    if ($('header,.slot,.share,.hide').hasClass('blur')) {
          $('header,.slot,.share,.hide').removeClass('blur');
    };
  }
  $scope.copied = function(){
    $scope.copyDone = true;
    $timeout(function() {
        $scope.copyDone = false;
    }, 3000);
  }
  $scope.pick = function(hero){
    if ($('header,.slot,.share,.hide').hasClass('blur')) {
          $('header,.slot,.share,.hide').removeClass('blur');
    };
    var playerPicking = $scope.playerSlot;
    $scope.picking = false;
    $('.'+playerPicking).addClass('confirmed');
      if(playerPicking == 'player1'){
        $scope.p1 = hero;
      }
      if(playerPicking == 'player2'){
        $scope.p2 = hero;
      }
      if(playerPicking == 'player3'){
        $scope.p3 = hero;
      }
      if(playerPicking == 'player4'){
        $scope.p4 = hero;
      }
      if(playerPicking == 'player5'){
        $scope.p5 = hero;
      }
      if(playerPicking == 'player6'){
        $scope.p6 = hero;
      }
      if(playerPicking == 'player10'){
        $scope.p10 = hero;
      }
      if(playerPicking == 'player20'){
        $scope.p20 = hero;
      }
      if(playerPicking == 'player30'){
        $scope.p30 = hero;
      }
      if(playerPicking == 'player40'){
        $scope.p40 = hero;
      }
      if(playerPicking == 'player50'){
        $scope.p50 = hero;
      }
      if(playerPicking == 'player60'){
        $scope.p60 = hero;
      }
  }
  $scope.url = $scope.p1.id + $scope.p2.id;

});