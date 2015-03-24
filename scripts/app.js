var app = angular.module("textTwilio", ['ngCookies', 'ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
      .when("/login", {
        templateUrl: "./views/login.html",
        controller: "loginCtrl"
      }
  )
      .when("/", {
        templateUrl: "./views/splash.html",
        controller: "splashCtrl"
      })

      .when("/user/:userId", {
        templateUrl: "./views/admin.html",
        controller: "adminCtrl",
        resolve: {
          user: function ($route, authService) {
            return authService.getUser($route.current.params.userId)
          }
        }
      })
      .otherwise("/", {
        templateUrl: "./views/splash.html",
        controller: "splashCtrl"
      })
})
