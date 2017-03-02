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
		$scope.lu_redirect=function(code,stockname){
			/*
			 * 交易市场
1 上海A
2 深圳A
3 上海B
4 深圳B
5 沪基金
6 深基金
21 板块


股票类型(SECU_TYPE)
字典项目	字典项目名称
1		交易所指数
15		其他指数
16		A股
17		中小板股
18		创业板股
22		B股
23		H股
31		其他股票
1、沪市
A股票代码是以60开头
B股代码是以900开头
新股申购的代码是以730开头
配股代码以700开头

2、深市
A股票代码是以00开头
B股代码是以200开头
新股申购的代码是以00开头
配股代码以080开头
中小板股票以002开头
创业板股票以300开头。*/
			stockname=encodeURIComponent(stockname);
			var stockcode=code.substring(2);
			var market=2;
			if(stockcode.substring(0,2)=="60"){
				market=1;
			}
			var stocktype=16;
			if(stockcode.substring(0,3)=="002"){
				stocktype=17;
			}else if(stockcode.substring(0,3)=="300"){
				stocktype=18;
			}
			if(window.Bridge){
				var url="lufax://stockmarket?market="+market+"&stockcode="+stockcode+"&stocktype="+stocktype+"&stockname="+stockname;
				window.Bridge.call({
	                "task":"schema",
	                "url":url
	            });

			}else{
				console.log('not in app');
			}
		}
		/*
		$scope.page={
	    		pageNo:0,
	    		pageSize:5,
	    		isOver:false
	    	}*/
    	var dataCB=function(isPage){
    		$scope.datas=ObjectFactory.get("datas");
	    	for(var i=0;i<$scope.datas.length;i++){
		    	if($stateParams.id==$scope.datas[i].id){
		    		$scope.initZH=$scope.datas[i];
		    		break;
		    	}
		    }
			$scope.stocks=[];
			for(var i=0;i<$scope.initZH.stocks.length;i++){
				$scope.initZH.stocks[i].change_rate_no=parseFloat($scope.initZH.stocks[i].change_rate);
				if($scope.initZH.stocks[i].change_rate_no>0){
					if(!$scope.initZH.stocks[i].change_rate.startWith("+")){
						$scope.initZH.stocks[i].change_rate="+"+$scope.initZH.stocks[i].change_rate;
					}
				}
				// $scope.stocks[i]=$scope.initZH.stocks[i];
			}
			$scope.initZH.total_change_rate_no=parseFloat($scope.initZH.total_change_rate);
			if($scope.initZH.total_change_rate_no>0){
				if(!$scope.initZH.total_change_rate.startWith("+")){
					$scope.initZH.total_change_rate="+"+$scope.initZH.total_change_rate;
				}
			}

			if($scope.initZH.attr.length>50){
				$scope.initZH.attr_small=$scope.initZH.attr.substring(0,50);
				$scope.initZH.attr_small_is=true;
			}else{
				$scope.initZH.attr_small=$scope.initZH.attr;
				$scope.initZH.attr_small_is=false;
			}
			if(isPage){
				$scope.stocks=$scope.initZH.stocks.slice($scope.page.pageNo*$scope.page.pageSize,($scope.page.pageNo+1)*$scope.page.pageSize);
				// console.log("len="+$scope.stocks.length);
				$scope.page.loadMore=function(){
					setTimeout(function(){
						$scope.page.pageNo++;
						// console.log('pageNo='+$scope.page.pageNo);
						$scope.stocks=$scope.stocks.concat($scope.initZH.stocks.slice($scope.page.pageNo*$scope.page.pageSize,($scope.page.pageNo+1)*$scope.page.pageSize));
						if($scope.stocks.length==$scope.initZH.stocks.length){
							$scope.page.isOver=true;
							console.log("over");
						}
						$scope.$broadcast('scroll.infiniteScrollComplete');
					},500);
				}
			}else{
				$scope.stocks=new Array();
				for(var i=0;i<$scope.initZH.stocks.length;i++){
					$scope.stocks[i]=$scope.initZH.stocks[i];
				}
			}
    	}

    	var filterAction=function(){
    		var condition=ObjectFactory.get("condition");

    		if(condition){
	    		dataCB(false);

			    var newStocks=[];
			    var condiName='price';
			    if(condition[condiName][0] || condition[condiName][1] || condition[condiName][2]){
				    for(var i=0;i<$scope.stocks.length;i++){
					    if(condition[condiName][0]){
					       	if($scope.stocks[i][condiName]<20){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }else if(condition[condiName][1]){
					        if($scope.stocks[i][condiName]>=20 && $scope.stocks[i][condiName]<=50){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }else if(condition[condiName][2]){
					        if($scope.stocks[i][condiName]>50){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }
					}
					$scope.stocks=newStocks;
				}

				newStocks=[];
				condiName='shizhi';
				if(condition[condiName][0] || condition[condiName][1] || condition[condiName][2]){
					for(var i=0;i<$scope.stocks.length;i++){
						if(condition[condiName][0]){
					       	if($scope.stocks[i][condiName]<10000000000){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }else if(condition[condiName][1]){
					        if($scope.stocks[i][condiName]>=10000000000 && $scope.stocks[i][condiName]<=50000000000){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }else if(condition[condiName][2]){
					        if($scope.stocks[i][condiName]>50000000000){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }
					}
					$scope.stocks=newStocks;
				}

				newStocks=[];
				condiName='shiyinglv';
				if(condition[condiName][0] || condition[condiName][1] || condition[condiName][2]){
					for(var i=0;i<$scope.stocks.length;i++){
						if(condition[condiName][0]){
					       	if($scope.stocks[i][condiName]<15){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }else if(condition[condiName][1]){
					        if($scope.stocks[i][condiName]>=15 && $scope.stocks[i][condiName]<=50){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }else if(condition[condiName][2]){
					        if($scope.stocks[i][condiName]>50){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }
					}
					$scope.stocks=newStocks;
				}

				newStocks=[];
				condiName='shijinglv';
				if(condition[condiName][0] || condition[condiName][1] || condition[condiName][2]){
					for(var i=0;i<$scope.stocks.length;i++){
						if(condition[condiName][0]){
					       	if($scope.stocks[i][condiName]<3){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }else if(condition[condiName][1]){
					        if($scope.stocks[i][condiName]>=3 && $scope.stocks[i][condiName]<=6){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }else if(condition[condiName][2]){
					        if($scope.stocks[i][condiName]>6){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }
					}
					$scope.stocks=newStocks;
				}

				newStocks=[];
				condiName='change_rate';
				if(condition[condiName][0] || condition[condiName][1] || condition[condiName][2]){
					for(var i=0;i<$scope.stocks.length;i++){
						if(condition[condiName][0]){
					       	if($scope.stocks[i][condiName]<0){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }else if(condition[condiName][1]){
					        if($scope.stocks[i][condiName]>=0){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }
					}
					$scope.stocks=newStocks;
				}

				newStocks=[];
				condiName='roe';
				if(condition[condiName][0] || condition[condiName][1] || condition[condiName][2]){
					for(var i=0;i<$scope.stocks.length;i++){
						if(condition[condiName][0]){
					       	if($scope.stocks[i][condiName]<0){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }else if(condition[condiName][1]){
					        if($scope.stocks[i][condiName]>=0 && $scope.stocks[i][condiName]<=20){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }else if(condition[condiName][2]){
					        if($scope.stocks[i][condiName]>20){
					        	newStocks[newStocks.length]=$scope.stocks[i];
					        }
					    }
					}
					$scope.stocks=newStocks;
				}
				newStocks=[];
				for(var i=0;i<$scope.stocks.length;i++){
					newStocks[i]=$scope.stocks[i];
				}

				$scope.stocks=newStocks.slice($scope.page.pageNo*$scope.page.pageSize,($scope.page.pageNo+1)*$scope.page.pageSize);
				// console.log("len="+$scope.stocks.length);
				$scope.page.loadMore=function(){
					setTimeout(function(){
						$scope.page.pageNo++;
						// console.log('pageNo='+$scope.page.pageNo);
						$scope.stocks=$scope.stocks.concat(newStocks.slice($scope.page.pageNo*$scope.page.pageSize,($scope.page.pageNo+1)*$scope.page.pageSize));
						if($scope.stocks.length==newStocks.length){
							$scope.page.isOver=true;
							console.log("over");
						}
						$scope.$broadcast('scroll.infiniteScrollComplete');
					},500);
				}

    		}
    	}
    	/*
    	$scope.showAttr=function(id){
    		$scope.datas=ObjectFactory.get("datas");
	    	for(var i=0;i<$scope.datas.length;i++){
		    	if($stateParams.id==$scope.datas[i].id){
		    		$scope.initZH=$scope.datas[i];
		    		break;
		    	}
		    }
		    $scope.old_help=$scope.help;
    	}*/
    	$scope.init=function(){

    		$scope.page={
	    		pageNo:0,
	    		pageSize:15,
	    		isOver:false
	    	}

	    	var condition=ObjectFactory.get("condition");
    		var isPage=true;
    		if(condition){
    			isPage=false;
    			filterAction();
    		}else{
    			if(!ObjectFactory.get("datas")){
		    		$http.post($rootScope.baseUrl+'data/all/'+$stateParams.id,{}).success(function(data){
		                ObjectFactory.set("datas",data);
		                dataCB(isPage);
		            });
		    	}else{
		    		dataCB(isPage);
		    	}
    		}


			if(window.Bridge){
				window.Bridge.call({
            	    "task":"navigation_bar",
            	 	"module":"common",
            	 	"naviBar":{
            	 		color:'ffffff',
            	 		titleColor:'13334D',
            	 		title:'策略详情'
            	 	},
            	 	"leftView":{
            	 		color:"526bc2"
            	 	}
                });
			}else{
				console.log('not in app');
			}
    	};

    }]
);
