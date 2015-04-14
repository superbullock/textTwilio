/**
 * Created by danielbullock on 3/21/15.
 */
angular.module("textTwilio").controller("splashCtrl", function ($scope, messageService) {

  $scope.sentTest = false;

  $scope.sendMessage = function (message) {
    message.body = "Thanks for trying out my app! Be sure to checkout my portfolio at http://superbullock.github.io! " + message.body;
    messageService.simpleMessage(message);

    $scope.message = {};
    $scope.loggedin = false;
    $scope.sentTest = true;
  }
})