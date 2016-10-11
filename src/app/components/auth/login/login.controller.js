function LoginController(authService, $state) {
  this.title = "Login Component";

  this.onLogin = function($event){
    authService
      .login($event.user)
      .then(function(){
        console.log('logged in');
        $state.go('app');
      })
  }
}

angular 
  .module('auth')
  .controller('LoginController', LoginController);