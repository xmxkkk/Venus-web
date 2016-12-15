var module=angular.module('starter.controllers', ['ionic','starter.services']);

module.run(['$rootScope','$state','$ionicModal','$location','$http','$ionicHistory'
  ,function($rootScope,$state,$ionicModal,$location,$http,$ionicHistory){
    $rootScope.go=function(page,params){
      console.log(page+"/"+params.id);
      $state.go(page,params);
    };
    if(document.domain=="localhost"||document.domain=="127.0.0.1"){
    	$rootScope.baseUrl="http://"+document.domain+":8080/venus-web/";
    }else if(document.domain=="123.207.115.17"){
    	$rootScope.baseUrl="http://"+document.domain+":8080/venus-web/";
    }
    else{
    	$rootScope.baseUrl="https://"+document.domain+":80/venus-web/";
    }
    $rootScope.getImage = function(src) {
    	if (src !== "") {
    	    return src;  
    	} else {
    		return "./img/default.jpg"; 
    	}
    };
}]);