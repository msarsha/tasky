function authService($firebaseAuth) {
  var authData = null;
  var auth = $firebaseAuth();

  function authSuccess(res) {
    console.log(res);
    return authData = res;
  }

  this.isAuthenticated = function () {
    return !!authData;
  };

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
}

angular
  .module('auth')
  .service('authService', authService);