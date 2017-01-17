// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.base'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider,$httpProvider,$locationProvider) {
  $stateProvider
  .state('home', {
    url: '/home',
    abstract: false,
    controller: 'IndexCtrl',
    cache:false,
    templateUrl:'templates/index.html'
  })
  .state('stock_list',{
    url:'/stock_list/:id',
    abstract: false,
    controller: 'StockListCtrl',
    cache:false,
    templateUrl: 'templates/stock_list.html'
  })
  .state('attr',{
    url:'/attr/:id',
    abstract: false,
    controller: 'AttrCtrl',
    cache:false,
    templateUrl: 'templates/attr.html'
  })
  .state('filter',{
    url:'/filter',
    abstract: false,
    controller: 'FilterCtrl',
    cache:false,
    templateUrl: 'templates/filter.html'
  })
  ;
  $urlRouterProvider.otherwise('/home');

  $httpProvider.defaults.transformRequest=function(obj){
    var str=[];
    for(var p in obj){
      str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
    }
    return str.join("&");
  };
  $httpProvider.defaults.headers.post={
    'Content-Type':'application/x-www-form-urlencoded'
  }
  $locationProvider.html5Mode(true);

  String.prototype.endWith=function(s){
    if(s==null||s==""||this.length==0||s.length>this.length)
       return false;
    if(this.substring(this.length-s.length)==s)
       return true;
    else
       return false;
    return true;
   }
   String.prototype.startWith=function(s){
    if(s==null||s==""||this.length==0||s.length>this.length)
     return false;
    if(this.substr(0,s.length)==s)
       return true;
    else
       return false;
    return true;
   }
   Array.prototype.slice=function(start,end){
      var x=new Array();
      for(var i=0;i<this.length;i++){
        if(i>=start&&i<end){
          x[x.length]=this[i];
        }
      }
      return x;
   }

});
