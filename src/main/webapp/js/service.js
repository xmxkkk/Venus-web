var module=angular.module('starter.services',[]);

module.factory('ObjectFactory',[function(){
    var _obj=[];
    return {
        set:function(key,obj){
            _obj[key]=obj;
        },
        get:function(key){
            return _obj[key];
        }
    }
}])
;

