'use strict';
manatools.controller('heroesController', function($scope,$location,$http){


    $http({method: 'GET', cache: true, url:'http://localhost/manatools/api/heroes'}).success(function(data, status, headers, config){
            $scope.heroes = data;
        }).error(function(data, status, headers, config){
            console.log(data)
        });


});