// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "login.html",
      controller: 'LoginCtrl'
    })
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.input',{
      url: "/input",
      views: {
        'home-tab': {
          templateUrl: "templates/input.html"
        }
      }
    })
    .state('tabs.output', {
      url: "/output",
      views: {
        'home-tab': {
          templateUrl: "templates/output.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/login");

})

.filter('real',
    ['$filter', function (filter) {
        return function (amount) {
            var n = amount,
            c = 2,
            d = ",",
            t = ".",
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
            return 'R$ ' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        }
}])

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

.service('HttpService', function($http) {
 return {
   login: function() {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.get('http://www.contason.com.br/api/login.php')
       .then(function (response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         return response.data;
       });
   }
 };
})


.controller('LoginCtrl', function($scope, HttpService){


  $scope.login = function(){
    HttpService.login().then(function(response){
      alert(response);
    });    
  };

  $scope.username = "jean";
  $scope.password = "senha";
})


.controller('HomeTabCtrl', function($scope, HttpService) {
  $scope.transactions = [
    {
      "name":"Espaço Gourmet",
      "value":-12.32,
      "date":"26/mar",
      "category":"Restaurante",
      "color":"#ef473a"
    },
    {
      "name":"Salário Jean P Cruz",
      "value":321.32,
      "date":"26/mar",
      "category":"",
      "color":"#387ef5"
    },
    {
      "name":"Faculdade Unifacef",
      "value": -910.00,
      "date":"27/mar",
      "category":"Educação",
      "color":"#ef473a"
    }
  ];
});
