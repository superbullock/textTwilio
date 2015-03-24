/**
 * Created by danielbullock on 3/17/15.
 */
angular.module("textTwilio").controller("indexCtrl",function ($rootScope, $scope, authService, $location) {

  //$scope.loggedin = authService.checkAuth();

  $scope.loggedin = $rootScope.loggedin || false;

  $rootScope.$watch(function () {
    $scope.loggedin = $rootScope.loggedin;
  })

  $scope.logout = function () {
    authService.logout().then(function (res) {
      $rootScope.currentUser = null;
      $rootScope.loggedin = false;
      $scope.loggedin = $rootScope.loggedin;
    })
  }

  $scope.homeOrSplash = function (loggedin) {
    if (!$rootScope.loggedin) $location.path('/')
    else {$location.path('/user/' + $rootScope.currentUser)}
  }
})