module.controller('IndexCtrl',['$scope','$rootScope','$state','$http','$stateParams','$location','$ionicHistory','$ionicTabsDelegate','ObjectFactory','$interval','$ionicScrollDelegate'
    ,function($scope,$rootScope,$state,$http,$stateParams,$location,$ionicHistory,$ionicTabsDelegate,ObjectFactory,$interval,$ionicScrollDelegate){
    	//$rootScope.idx=0;
        /*
        $interval(function(){
            var idx=parseInt(ObjectFactory.get('idx'));
            console.log("auto:"+idx);
            $ionicTabsDelegate.select(idx);
        },10,1);*/

        $scope.init=function(){
            $scope.tabIdx=0;
            $http.post($rootScope.baseUrl+'data/all',{}).success(function(data){
                for(var i=0;i<data.length;i++){
                    data[i].total_change_rate_no=parseFloat(data[i].total_change_rate);
                    if(data[i].total_change_rate_no>0){
                        if(!data[i].total_change_rate.startWith("+")){
                            data[i].total_change_rate="+"+data[i].total_change_rate;
                        }
                    }
                    // console.log(data[i].total_change_rate_no);
                }
                $scope.datas=data;

                ObjectFactory.set("datas",$scope.datas);
            });
            ObjectFactory.set("condition",null);

            $scope.selectTabWithIndex($scope.tabIdx);

            if(window.Bridge){
            	window.Bridge.call({
            	    "task":"navigation_bar",
            	 	"module":"common",
            	 	"naviBar":{
            	 		color:'ffffff',
            	 		titleColor:'13334D',
            	 		title:'智能选股'
            	 	},
            	 	"leftView":{
            	 		color:"526bc2"
            	 	}
                });
            }else{
                console.log('not in app');
            }
            $scope.isShowHelp=true;
    	};

    	$scope.selectTabWithIndex = function(index) {
            $scope.tabIdx=index;
			$ionicScrollDelegate.scrollTop();
            $scope.img0="./img/render/2X/btn_list_celue1.png";
            $scope.img1="./img/render/2X/btn_list_jiage1.png";
            $scope.img2="./img/render/2X/btn_list_jishu1.png";
            if(index==0){
                $scope.img0="./img/render/2X/btn_list_celue2.png";
            }else if(index==1){
                $scope.img1="./img/render/2X/btn_list_jiage2.png";
            }else if(index==2){
                $scope.img2="./img/render/2X/btn_list_jishu2.png";
            }

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
