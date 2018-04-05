// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])


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
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.platform.android.tabs.position("bottom");
 })

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state("tabs", 
  {
    url:"/tab",
    templateUrl: "templates/tabs.html",
    abstract: true
  })
  .state("tabs.home", 
  {
    url: "/home",
    views: 
    {
      "home-tab": 
      {
        templateUrl: "templates/home.html",
      }
    }
  })
  .state("tabs.about", 
  {
    url: "/about",
    views: 
    {
      "about-tab": 
      {
        templateUrl: "templates/about.html",
      }
    }
  })
  .state("tabs.contact",{
    url:"/contact",
    views:{
      'about-tab':{
        templateUrl:"templates/contact.html",
      }
    }
  })
  .state("tabs.rooms",{
    url:"/rooms",
    views:{
      "rooms-tab":{
        templateUrl:"templates/rooms.html",
        controller:"RoomsCtrl"
      }
    }
  })
  .state("tabs.room",{
    url:"/rooms/:ID",
    views:{
      "rooms-tab":{
        templateUrl:"templates/room.html",
        controller:"RoomsCtrl"
      }
    }
  })
  .state("tabs.checkout",{
    url:"/rooms/checkout",
    views:{
      "rooms-tab":{
        templateUrl:"templates/checkout.html",
        controller:"RoomsCtrl"
      }
    }
  })
})
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/tab/home");
})

.controller("RoomsCtrl", function($rootScope,$scope,$http,$state,$stateParams){
  $rootScope.data = {};
  $rootScope.submit=function(){
    var url='http://webacademy.se/ionic/index.php';
    $http.post(url,$rootScope.data).then(function (response){
      $rootScope.response=response;
    })
    console.log($rootScope);
    console.log(response);
  }

  $http.get('../model/data.json')
  .success(function(data){
    $scope.rum = data;
    $scope.valdrum = $state.params.ID;
    console.log($scope.rum);
    console.log($state);
    /*$scope.valdrum=$scope.rum.find(function(item){
      return item.ID==$stateParams.ID;
    });*/
    console.log($scope.valdrum);
   })
   $scope.data = {};
   $scope.doRefresh = function() {
    $http.get('../model/data.json')
    .success(function(data){
      $scope.rum = data;
     })
     .finally(function() {
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });

  }
  $scope.dateDifference = function() {
    var dropdt = new Date(example);
    var pickdt = new Date(this.seconddate);
    var dif = parseInt((dropdt - pickdt) / (24 * 3600 * 1000));
    return dif;
};
})