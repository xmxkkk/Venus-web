module.controller('FilterCtrl',['$scope','$rootScope','$state','$http','$stateParams','$location','$window','$ionicHistory','$ionicModal'
    ,function($scope,$rootScope,$state,$http,$stateParams,$location,$window,$ionicHistory,$ionicModal){
    	$scope.init=function(){
    		$rootScope.condition['price']=[false,false,false];
            $rootScope.condition['shizhi']=[false,false,false];
            $rootScope.condition['shiyinglv']=[false,false,false];
    	}
    	$scope.check=function(condi,idx){
    		if($rootScope.condition[condi][idx]){
    			$rootScope.condition[condi][idx]=!$rootScope.condition[condi][idx];
    		}else{
    			$rootScope.condition[condi]=[false,false,false];
    			$rootScope.condition[condi][idx]=true;
    		}
    		console.log(condi+"/"+idx);
    	}
    	$scope.closeFilterAction=function(){
    		$scope.modal.hide();

		    $rootScope.$broadcast("filterClose");
    	}

    }]
);