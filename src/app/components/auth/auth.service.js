function authService($firebaseAuth) {
  var authData = null;
  var auth = $firebaseAuth();
  
  this.isAuthenticated = function(){
    return !!authData;
  };

  this.register = function(user){
    return auth
      .$createUserWithEmailAndPassword(user.email, user.password)
      .then(function (response) {
        console.log(response);
        return authData = response;
      });
  };

  this.login = function(user){
    
  }
}

angular
  .module('auth')
  .service('authService', authService);