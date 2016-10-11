function authService($firebaseAuth) {
  var authData = null;
  var auth = $firebaseAuth();

  function authSuccess(res) {
    console.log(res);
    return authData = res;
  }

  function authError(err) {
    console.log(err);
    return authData = null;
  }

  this.isAuthenticated = function () {
    authData = auth.$getAuth();
    return !!authData;
  };

  this.requireAuth = function(){
    return auth
      .$waitForSignIn()
      .then(authSuccess);
  }

  this.register = function (user) {
    return auth
      .$createUserWithEmailAndPassword(user.email, user.password)
      .then(authSuccess)
      .catch(authError);
  };

  this.login = function (user) {
    return auth
      .$signInWithEmailAndPassword(user.email, user.password)
      .then(authSuccess)
      .catch(authError);
  }
}

angular
  .module('auth')
  .service('authService', authService);