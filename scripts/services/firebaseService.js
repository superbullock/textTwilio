/**
 * Created by danielbullock on 3/17/15.
 */
angular.module('textTwilio').service("firebaseService", function ($q) {

  var ref = new Firebase("https://testuserapp.firebaseio.com");

  this.firebaseLogin = function (auth) {
    var deferred = $q.defer();
    ref.authWithPassword(auth, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        deferred.resolve(error)
      } else {
        console.log("Authenticated successfully with payload:", authData);
        deferred.resolve(authData);
      }
    });
    return deferred.promise
  }

  this.firebaseCreate = function (user) {
    var deferred = $q.defer();
    ref.createUser(user, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
        deferred.resolve(error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        deferred.resolve(userData.uid);

      }
    });
    return deferred.promise;
  }

  this.logout = function () {
    var deferred = $q.defer()
    ref.unauth(function (err) {
      if (err) deferred.resolve(err)
      else deferred.resolve();
    })
    return deferred.promise;
  }
})