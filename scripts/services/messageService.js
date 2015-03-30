/**
 * Created by danielbullock on 3/21/15.
 */
angular.module("textTwilio").factory('messageService', function ($q, $http) {


  var messageService = {
    composeMessage: function (message, contacts, uid) {
      var deferred = $q.defer()
      $http.post('/messageHistory/' + uid, message).then();
      var promises = [];
      for (var i = 0; i < contacts.length; i++) {
        message.to = contacts[i].phone;
        promises.push($http.post('/messages', message))
      }
      $q.all(promises).then(function(res) {
        deferred.resolve("Success!")
      })
      return deferred.promise;
    },

    getMessages: function (uid) {
      var deferred = $q.defer()
      $http.get('/messages/' + uid).then(function(res) {
        var arr = res.data.reverse();
        if (arr.length > 5) {
          var newArr = arr.slice(0, 5)
        } else {
          var newArr = arr.slice()
        }
        deferred.resolve(newArr)
      })
      return deferred.promise;
    },

    simpleMessage: function (message) {
      $http.post("/messages", message);
    }
  }





  return messageService;
})