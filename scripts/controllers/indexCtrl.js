/**
 * Created by danielbullock on 3/17/15.
 */
angular.module("textTwilio").controller("indexCtrl",function ($scope, authService) {

  //$scope.loggedin = authService.checkAuth();

  $scope.logout = function () {
    authService.logout().then(function (res) {
    })
  }

})