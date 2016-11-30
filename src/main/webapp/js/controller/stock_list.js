module.controller('StockListCtrl',['$scope','$rootScope','$state','$http','$stateParams','$location','$window','$ionicHistory','$ionicModal','ObjectFactory'
    ,function($scope,$rootScope,$state,$http,$stateParams,$location,$window,$ionicHistory,$ionicModal,ObjectFactory){

    	/*
    	$scope.datas=[{i:0,id:1000,name:"中医药概念",up:11,down:10,flat:0,img:"./img/index_top_2.jpg"}
    		,{i:1,id:1001,name:"养老行业",up:8,down:10,flat:0,img:"./img/index_top_1.jpg"}
    		,{i:2,id:1002,name:"精密加工",up:8,down:10,flat:0,img:"./img/index_top_3.jpg"}
    		,{i:3,id:1003,name:"环保概念",up:8,down:10,flat:0,img:"./img/index_top_6.jpg"}
    		,{i:4,id:1004,name:"国际品牌",up:8,down:10,flat:0,img:"./img/index_top_4.jpg"}
    		,{i:5,id:1005,name:"出口",up:8,down:10,flat:0,img:"./img/index_top_5.jpg"}
    		
    		];*/
    	/*
    	$scope.initZH={id:1000,name:"中医药概念",attr:"趋势投资策略，低频交易，出手稳健，冷静的趋势派。",up:11,down:10,flat:0,img:"./img/index_top_2.jpg"
    	,stocks:[{code:'SH100000',name:'中国银行1',price:3.6,change_rate:"-3.01",shizhi:100000000,shiyinglv:10}
    		,{code:'SH100000',name:'招商银行2',price:13.6,change_rate:"-3.10",shizhi:200000000,shiyinglv:10}
    		,{code:'SH100000',name:'农业银行3',price:23.6,change_rate:"3.20",shizhi:300000000,shiyinglv:80}
    		,{code:'SH100000',name:'工商银行4',price:33.6,change_rate:"3.30",shizhi:1000000000,shiyinglv:30}
    		,{code:'SH100000',name:'农业银行5',price:43.6,change_rate:"-3.00",shizhi:10000000000,shiyinglv:20}
    		,{code:'SH100000',name:'工商银行6',price:3.6,change_rate:"-3.00",shizhi:20000000000,shiyinglv:10}
    		,{code:'SH100000',name:'农业银行7',price:3.6,change_rate:"-3.00",shizhi:100000000,shiyinglv:100}
    		,{code:'SH100000',name:'工商银行8',price:3.6,change_rate:"-3.40",shizhi:100000000,shiyinglv:30}
    		,{code:'SH100000',name:'农业银行9',price:3.6,change_rate:"-3.00",shizhi:100000000,shiyinglv:60}
    		,{code:'SH100000',name:'工商银行10',price:3.6,change_rate:"-3.00",shizhi:1000000000,shiyinglv:100}]};*/

    	var dataCB=function(){
    		$scope.datas=ObjectFactory.get("datas");
	    	for(var i=0;i<$scope.datas.length;i++){
		    	if($stateParams.id==$scope.datas[i].id){
		    		$scope.initZH=$scope.datas[i];
		    		break;
		    	}
		    }
			$scope.stocks=[];
			for(var i=0;i<$scope.initZH.stocks.length;i++){
				$scope.stocks[i]=$scope.initZH.stocks[i];
			}
	    	
    	}

    	$scope.init=function(){
			if(!ObjectFactory.get("datas")){
	    		 $http.post($rootScope.baseUrl+'data/all/'+$stateParams.id,{}).success(function(data){
	                ObjectFactory.set("datas",data);
	                dataCB();
	            });
	    	}else{
	    		dataCB();
	    	}
	    	$rootScope.condition={};
    	};
		$ionicModal.fromTemplateUrl('templates/filterModel.html', {
		    scope: $scope,
		    animation: 'slide-down-up'
		}).then(function(modal) {
		    $scope.modal = modal;
		});
		$scope.openModal = function() {
		    $scope.modal.show();
		};
		$scope.closeModal = function() {
		    $scope.modal.hide();
		};
		
		$scope.$on('$destroy', function() {
		    $scope.modal.remove();
		});
		
		$scope.$on('modal.removed', function() {
		    // 执行动作
		});
		$scope.filterAction=function(){
			$scope.modal.show();
		};

		$scope.$on('filterClose',function(){
		    console.log($rootScope.condition);

		    $scope.stocks=[];
			for(var i=0;i<$scope.initZH.stocks.length;i++){
				$scope.stocks[i]=$scope.initZH.stocks[i];
			}

		    var newStocks=[];
		    var condiName='price';
		    if($rootScope.condition[condiName][0] || $rootScope.condition[condiName][1] || $rootScope.condition[condiName][2]){
			    for(var i=0;i<$scope.stocks.length;i++){
				    if($rootScope.condition[condiName][0]){
				       	if($scope.stocks[i][condiName]<20){
				        	newStocks[newStocks.length]=$scope.stocks[i];
				        }
				    }else if($rootScope.condition[condiName][1]){
				        if($scope.stocks[i][condiName]>=20 && $scope.stocks[i][condiName]<=50){
				        	newStocks[newStocks.length]=$scope.stocks[i];
				        }
				    }else if($rootScope.condition[condiName][2]){
				        if($scope.stocks[i][condiName]>50){
				        	newStocks[newStocks.length]=$scope.stocks[i];
				        }
				    }
				}
				$scope.stocks=newStocks;
			}
			
			newStocks=[];
			condiName='shizhi';
			if($rootScope.condition[condiName][0] || $rootScope.condition[condiName][1] || $rootScope.condition[condiName][2]){
				for(var i=0;i<$scope.stocks.length;i++){
					if($rootScope.condition[condiName][0]){
				       	if($scope.stocks[i][condiName]<1000000000){
				        	newStocks[newStocks.length]=$scope.stocks[i];
				        }
				    }else if($rootScope.condition[condiName][1]){
				        if($scope.stocks[i][condiName]>=1000000000 && $scope.stocks[i][condiName]<=20000000000){
				        	newStocks[newStocks.length]=$scope.stocks[i];
				        }
				    }else if($rootScope.condition[condiName][2]){
				        if($scope.stocks[i][condiName]>20000000000){
				        	newStocks[newStocks.length]=$scope.stocks[i];
				        }
				    }
				}
				$scope.stocks=newStocks;
			}

			newStocks=[];
			condiName='shiyinglv';
			if($rootScope.condition[condiName][0] || $rootScope.condition[condiName][1] || $rootScope.condition[condiName][2]){
				for(var i=0;i<$scope.stocks.length;i++){
					if($rootScope.condition[condiName][0]){
				       	if($scope.stocks[i][condiName]<15){
				        	newStocks[newStocks.length]=$scope.stocks[i];
				        }
				    }else if($rootScope.condition[condiName][1]){
				        if($scope.stocks[i][condiName]>=15 && $scope.stocks[i][condiName]<=50){
				        	newStocks[newStocks.length]=$scope.stocks[i];
				        }
				    }else if($rootScope.condition[condiName][2]){
				        if($scope.stocks[i][condiName]>50){
				        	newStocks[newStocks.length]=$scope.stocks[i];
				        }
				    }
				}
				$scope.stocks=newStocks;
			}

			/*
			if(newStocks.length && newStocks.length>0){
				$scope.stocks=newStocks;
				console.log($scope.stocks);
			}else{
				$scope.stocks=[];
			}*/
		});
    	
    }]
);