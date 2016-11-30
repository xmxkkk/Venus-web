module.controller('IndexCtrl',['$scope','$rootScope','$state','$http','$stateParams','$location','$ionicHistory','$ionicTabsDelegate','ObjectFactory','$interval'
    ,function($scope,$rootScope,$state,$http,$stateParams,$location,$ionicHistory,$ionicTabsDelegate,ObjectFactory,$interval){
    	//$rootScope.idx=0;
        /*
        $interval(function(){
            var idx=parseInt(ObjectFactory.get('idx'));
            console.log("auto:"+idx);  
            $ionicTabsDelegate.select(idx);  
        },10,1);*/
        
        $scope.init=function(){
            $http.post($rootScope.baseUrl+'data/all',{}).success(function(data){
                $scope.datas=data;
                ObjectFactory.set("datas",data);
            });

    	};

    	$scope.selectTabWithIndex = function(index) {
		    $ionicTabsDelegate.select(index,true);
            if(index==0){
                $scope.datas=ObjectFactory.get("datas");
            }else if(index==1){
                var datas=ObjectFactory.get("datas");
                var ix=0;
                var temp=[];
                for(var i=0;i<datas.length;i++){
                    if(datas[i].type=='JIAZHI'){
                        temp[temp.length]=datas[i];
                    }
                }
                $scope.datas=temp;
            }else if(index==2){
                var datas=ObjectFactory.get("datas");
                var ix=0;
                var temp=[];
                for(var i=0;i<datas.length;i++){
                    if(datas[i].type=='JISHU'){
                        temp[temp.length]=datas[i];
                    }
                }
                $scope.datas=temp;
            }
		}
    }]
);