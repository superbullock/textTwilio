/**
 * Created by danielbullock on 3/17/15.
 */
angular.module("textTwilio").controller("adminCtrl", function ($scope, user, contactService, messageService) {
  $scope.user = user.data[0];

  getContacts = function () {
    contactService.getContacts($scope.user.uid).then(function (res) {
      $scope.contacts = res;
    })

    messageService.getMessages($scope.user.uid).then(function(res) {
      $scope.messages = res;
    })
  }

  getContacts()

  $scope.createContact = function (contact) {
    contactService.createContact(contact, $scope.user.uid).then(function (res) {
      console.log(res);
      getContacts();
      $scope.newContact = {};
    })
  }

  $scope.composeMessage = function (message) {
    messageService.composeMessage(message, $scope.contacts, $scope.user.uid).then(function (res) {
      console.log(res);
      $scope.message = {};
    })
  }

  $scope.deleteContact = function (contact) {
    contactService.deleteContact(contact).then(function (res) {
      getContacts();
    })
  }

  $scope.messageStream = false;

  $scope.toggleMessageStream = function() {
    $scope.messageStream = !$scope.messageStream;
  }



})