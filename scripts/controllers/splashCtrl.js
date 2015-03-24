/**
 * Created by danielbullock on 3/21/15.
 */
angular.module("textTwilio").controller("splashCtrl", function ($scope, messageService) {
  $scope.sendMessage = function (message) {
    messageService.simpleMessage(message);
    $scope.message = {};
  }
})