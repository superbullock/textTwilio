/**
 * Created by danielbullock on 3/17/15.
 */
angular.module("textTwilio").controller("adminCtrl", function ($scope, user, contactService, messageService, ngDialog) {
  $scope.user = user.data[0];
  $scope.menuOpen = false;
  $scope.editToggle = true;
  $scope.deleteContacts = "Delete Contacts";

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
      getContacts();
    })
  }

  $scope.deleteContact = function (contact) {
    contactService.deleteContact(contact).then(function (res) {
      getContacts();
    })
  }

  $scope.messageStream = true;

  $scope.toggleMessageStream = function() {
    $scope.messageStream = !$scope.messageStream;
  }

  $scope.contactEdit = function (contact) {
    var options = {
      template: "../../dialogs/editContact.html",
      controller: ['$scope', 'contactService', function($scope, contactService) {
        $scope.updateContact = function (contact) {
          contactservice.updateContact(contact);
        }
      }],
      data: contact

    }
    ngDialog.open(options);
  }

  $scope.menuToggle = function () {
    $scope.menuOpen = !$scope.menuOpen;
  }

  $scope.editTgl = function () {
    $scope.editToggle = !$scope.editToggle;
    if ($scope.editToggle) {$scope.deleteContacts = "Delete Contacts";}
    else {$scope.deleteContacts = "Cancel";}
  }


})