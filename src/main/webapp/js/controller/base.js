var module=angular.module('starter.base', ['ionic','starter.services']);

module.run(['$rootScope','$state','$ionicModal','$location','$http','$ionicHistory','$stateParams','ObjectFactory'
  ,function($rootScope,$state,$ionicModal,$location,$http,$ionicHistory,$stateParams,ObjectFactory){
	$rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
        $rootScope.previousState_name = fromState.name;
        $rootScope.previousState_params = fromParams;
        event.preventDefault();
    });
    $rootScope.back = function() {
        $state.go($rootScope.previousState_name,$rootScope.previousState_params);
    };

    $rootScope.go=function(page,params){
    //   console.log(page+"/"+params.id);
      $state.go(page,params);
    };
    if(document.domain=="localhost"||document.domain=="127.0.0.1"||document.domain=="192.168.31.150"){
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
    $rootScope.help={
        title:'帮 助',
        text:"<p>智能选股通过现代统计学数学的方式来分析每家上市公司的历史走势、财务情况、资金的流入流出、以及这家公司接下来的发展预期在结合当前行情利好那些板块等多方面了解，系统每天自动运算，在上千中股票挑选出数只不等的潜力股。</p>"+
  "<p>通过系统运算挑选的股票群组中，用户还可以通过已精选的基本面个股群组，进行个人筛选，通过价格、涨跌幅、市盈率等直观指标，筛选出个人喜好的股票组合，作为投资方向进行重点关注。</p>",
        isShowHelp:false,
        showHelp:function(id){
            if(id>0){
                $rootScope.help.title_old=$rootScope.help.title;
                $rootScope.help.text_old=$rootScope.help.text;

                var initZH;
                var datas=ObjectFactory.get("datas");
                for(var i=0;i<datas.length;i++){
                    if(id==datas[i].id){
                        initZH=datas[i];
                        break;
                    }
                }
                $rootScope.help.title=initZH.name;
                $rootScope.help.text=initZH.attr;
            }
            $rootScope.help.isShowHelp=true;
        },
        hideHelp:function(){
            if($rootScope.help.title_old){
                $rootScope.help.title=$rootScope.help.title_old;
                $rootScope.help.text=$rootScope.help.text_old;

                $rootScope.help.title_old=null;
                $rootScope.help.text_old=null;
            }
            $rootScope.help.isShowHelp=false;
        }
    }
}]);
