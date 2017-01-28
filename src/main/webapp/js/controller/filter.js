module.controller('FilterCtrl',['$scope','$rootScope','$state','$http','$stateParams','$location','$window','$ionicHistory','$ionicModal','ObjectFactory'
    ,function($scope,$rootScope,$state,$http,$stateParams,$location,$window,$ionicHistory,$ionicModal,ObjectFactory){
    	$scope.init=function(){
    		var condition=ObjectFactory.get("condition");
    		if(condition){
    			$scope.condition=condition;
    		}else{
    			$scope.condition={};
    			$scope.condition['price']=[false,false,false];
    			$scope.condition['shizhi']=[false,false,false];
    			$scope.condition['shiyinglv']=[false,false,false];
    			$scope.condition['shijinglv']=[false,false,false];
    			$scope.condition['change_rate']=[false,false];
    			$scope.condition['roe']=[false,false,false];
    		}

            if(window.Bridge){
                window.Bridge.call({
            	    "task":"navigation_bar",
            	 	"module":"common",
            	 	"naviBar":{
            	 		color:'ffffff',
            	 		titleColor:'13334D',
            	 		title:'筛选'
            	 	},
            	 	"leftView":{
            	 		color:"526bc2"
            	 	}
                });
            }else{
                console.log('not in app');
            }
            $scope.btn2=0;
    	    $scope.btn1=0;
        }
    	$scope.check=function(condi,idx){
    		if($scope.condition[condi][idx]){
    			$scope.condition[condi][idx]=!$scope.condition[condi][idx];
    		}else{
                if($scope.condition[condi].length==2){
                    $scope.condition[condi]=[false,false];
                }else{
                    $scope.condition[condi]=[false,false,false];
                }
    			
    			$scope.condition[condi][idx]=true;
    		}
    		console.log(condi+"/"+idx);
    		ObjectFactory.set("condition",$scope.condition);
    	}
        $scope.clearFilter=function(){
            $scope.condition['price']=[false,false,false];
            $scope.condition['shizhi']=[false,false,false];
            $scope.condition['shiyinglv']=[false,false,false];
            $scope.condition['shijinglv']=[false,false,false];
            $scope.condition['change_rate']=[false,false];
            $scope.condition['roe']=[false,false,false];
            ObjectFactory.set("condition",$scope.condition);
        }
    	$scope.closeFilterAction=function(){
    		//$scope.modal.hide();
		   // $rootScope.$broadcast("filterClose");
//    		$ionicHistory.clearHistory();
    		
//    		$ionicHistory.goBack(-1);
    		
    		$scope.back();
    		
//    		$state.go(-1,"");
    	}

    }]
);