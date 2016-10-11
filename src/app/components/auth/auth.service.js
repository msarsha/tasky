function authService($firebaseAuth) {
  var authData = null;
  var auth = $firebaseAuth();

  function onSignOut() {
    authData = null;
  }

  function authSuccess(res) {
    authData = res;
    return res;
  }

  this.isAuthenticated = function () {
    authData = auth.$getAuth();
    return !!authData;
  };

  this.requireAuth = function(){
    return auth
      .$requireSignIn()
      .then(authSuccess);
  }

  this.register = function (user) {
    return auth
      .$createUserWithEmailAndPassword(user.email, user.password)
      .then(authSuccess);
  };

  this.login = function (user) {
    return auth
      .$signInWithEmailAndPassword(user.email, user.password)
      .then(authSuccess);
  }

  this.getUser = function(){
    return authData;
  }

  this.logout = function(){
     return auth
      .$signOut(onSignOut);
  }
}

angular
  .module('auth')
  .service('authService', authService);