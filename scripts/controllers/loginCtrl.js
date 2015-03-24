/**
 * Created by danielbullock on 3/17/15.
 */
angular.module("textTwilio").controller("loginCtrl",function ($rootScope, $scope, authService, $location) {

  //$scope.loggedin = authService.checkAuth();
  $scope.login = true;
  $scope.register = false;

  $scope.registerToggle = function () {
    $scope.login = !$scope.login;
    $scope.register = !$scope.register;
  }

  $scope.authEmail = function (auth) {
    authService.login(auth).then(function(data) {
      $rootScope.loggedin = true;
      $rootScope.currentUser = data.uid;
      $location.path('/user/' + data.uid)

    });
  }

  $scope.createUser = function (user) {
    authService.createUser(user);
  }


})