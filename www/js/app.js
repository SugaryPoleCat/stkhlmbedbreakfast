// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])


.run(function($ionicPlatform)
{
  $ionicPlatform.ready(function()
  {
    if(window.cordova && window.cordova.plugins.Keyboard)
    {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar)
    {
      StatusBar.styleDefault();
    }
  });
})
.config(function($ionicConfigProvider)
{
  $ionicConfigProvider.platform.android.tabs.position("bottom");
})

.config(function($stateProvider, $urlRouterProvider)
{
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
  .state("tabs.contact",
  {
    url:"/contact",
    views:
    {
      'about-tab':
      {
        templateUrl:"templates/contact.html",
      }
    }
  })
  .state("tabs.rooms",
  {
    url:"/rooms",
    views:
    {
      "rooms-tab":
      {
        templateUrl:"templates/rooms.html",
        controller:"RoomsCtrl"
      }
    }
  })
  .state("tabs.room",
  {
    url:"/rooms/:ID",
    views:
    {
      "rooms-tab":
      {
        templateUrl:"templates/room.html",
        controller:"RoomsCtrl"
      }
    }
  })
})
.config(function($stateProvider, $urlRouterProvider)
{
  $urlRouterProvider.otherwise("/tab/home");
})

.controller("RoomsCtrl", function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$filter)
{
  $http.get('../model/data.json')
  .success(function(data2)
  {
    $scope.rum = data2;
    $scope.valdrum = $state.params.ID;
    console.log($scope.rum);
    console.log($state);
    /*$scope.valdrum=$scope.rum.find(function(item){
      return item.ID==$stateParams.ID;
    });*/
    console.log("Valdrum: " + $scope.valdrum);
   })

   $scope.doRefresh = function()
   {
    $http.get('../model/data.json')
    .success(function(data3)
    {
      $scope.rum = data3;
    })
    .finally(function()
    {
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  }

  $scope.today=$filter("date")(Date.now(),'yyyy-MM-dd');

  $scope.dateDifference = function(date1,date2)
  {
    var checkin = new Date(date1);
    var checkout = new Date(date2);

    var timeDiff = Math.abs(checkout.getTime() - checkin.getTime());
    var diffDays=Math.ceil(timeDiff/(1000*3600*24));
    var diffFinal=parseInt(diffDays);
    if(diffFinal==0){
      diffFinal=1;
    }
    $rootScope.diffFinal=diffFinal;
    return diffFinal;
  };
  $scope.getBookDate=function(){
    $scope.bookDate=$filter("date")($scope.data.date1, 'yyyy-MM-dd');
  }
  
  $scope.confirm=function(){
    $scope.totalPris=($scope.data.price-0)*$scope.diffFinal;
    $scope.data.days=$scope.diffFinal;
    $scope.data.totalprice=$scope.totalPris;
    console.log($scope.diffFinal);
    console.log($scope.totalPris);
  }

  $scope.data = {};
  $scope.submit=function()
  {
    console.log($scope.data);
    // When button is clicked, the popup will be shown...
    $scope.showPopup = function()
    {
      // Custom popup
      var myPopup = $ionicPopup.show(
        {
         template: '<b>Ditt namn: </b>'+$scope.data.fNamn+'<br/>'+
         '<b>Efter namn: </b>'+$scope.data.eNamn+'<br/>'+
         '<b>Email: </b>'+$scope.data.email+'<br/>'+
         '<b>Telefon: </b>'+$scope.data.telefon+'<br/>'+
         '<b>Antal vuxna: </b>'+$scope.data.antvuxen+'<br/>'+
         '<b>Antal barn: </b>'+$scope.data.antbarn+'<br/>'+
         '<b>Checkin: </b>'+$scope.data.date1+'<br/>'+
         '<b>Checkout: </b>'+$scope.data.date2+'<br/>'+
         '<b>Total pris: </b>'+$scope.data.totalPris+'<br/>'+
         '<b>Antal dagar: </b>'+$scope.data.diffFinal+'<br/>',
         title: 'Tack!',
         subTitle: 'Du har köpt grejen!',
         scope: $scope,
         buttons: [
              {
               text: '<b>Najs</b>',
               type: 'button-positive',
               /*onTap: function(e)
               {
                  if (!$rootScope.data.model)
                  {
                     //don't allow the user to close unless he enters model...
                     e.preventDefault();
                  } else
                  {
                     return $rootScope.data.model;
                  }
               }*/
            }
         ]
      });
  
      myPopup.then(function(res)
      {
         console.log('Tapped!', res);
      });    
    };
  }
  
})