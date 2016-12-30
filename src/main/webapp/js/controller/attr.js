module.controller('AttrCtrl',['$scope','$rootScope','$state','$http','$stateParams','$location','$window','$ionicHistory','$ionicModal','ObjectFactory'
    ,function($scope,$rootScope,$state,$http,$stateParams,$location,$window,$ionicHistory,$ionicModal,ObjectFactory){

		$scope.init=function(){
			$scope.datas=ObjectFactory.get("datas");
	    	for(var i=0;i<$scope.datas.length;i++){
		    	if($stateParams.id==$scope.datas[i].id){
		    		$scope.initZH=$scope.datas[i];
		    		break;
		    	}
		    }
	    	console.log($scope.initZH);
		};
    }]
);