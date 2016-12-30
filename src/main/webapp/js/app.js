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


.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
  $stateProvider
  .state('index', {
    url: '/index',
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
  ;
  $urlRouterProvider.otherwise('/index');

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


});
