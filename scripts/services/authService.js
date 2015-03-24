/**
 * Created by danielbullock on 3/17/15.
 */
angular.module("textTwilio").service("authService", function (firebaseService, $http, $q, $cookies) {

  this.login = function (auth) {
    var deferred = $q.defer();
    firebaseService.firebaseLogin(auth).then(function(data) {
      $http.get('/user/' + data.auth.uid).then(function(res) {

        //$cookies.put( 'uid', res.data[0].uid)
        deferred.resolve(res.data[0])
      })
    });
    return deferred.promise
  };

  this.createUser = function(user) {
    var deferred = $q.defer();
    firebaseService.firebaseCreate({email: user.email, password: user.password}).then(function(data) {
      user.password = '';
      user.uid = data;
      $http.post("/user", user).then(function(data) {
        //$cookies.put( 'uid', res.data[0].uid)
      })
    });
  };

  this.logout = function() {
    var deferred = $q.defer()
    firebaseService.logout().then(function(res) {
      deferred.resolve(res);
    })
    return deferred.promise
  }

  this.checkAuth = function ( ) {
    var cookieSession = $cookies.get("uid")
    if (cookieSession)
    return cookieSession;
  }

  this.getUser = function (params) {
    return $http.get('/user/' + params)
  }

})