/**
 * Created by danielbullock on 3/17/15.
 */
angular.module("textTwilio").service("contactService", function ($http, $q) {
  this.getContacts = function (userid) {
    var deferred = $q.defer();
    $http.get('/contacts/' + userid).then(function(res) {
      deferred.resolve(res.data);
    })
    return deferred.promise;
  }

  this.createContact = function (contact, uid) {
    contact.uid = uid;
    contact.groups = ['all'];
    var deferred = $q.defer();
    $http.post('/contacts', contact).then(function(res) {
      deferred.resolve(res);
    })
    return deferred.promise
  }

  this.deleteContact = function (contact) {
    var deferred = $q.defer(  )
    $http.delete('/contacts/' + contact).then(function(res) {
      deferred.resolve(res);
    })
    return deferred.promise;
  }
})