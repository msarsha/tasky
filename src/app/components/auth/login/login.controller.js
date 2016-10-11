function LoginController(authService, $state) {
  this.title = "Login Component";

  this.onLogin = function($event){
    authService
      .login($event.user)
      .then(function(){
        console.log('logged in');
        $state.go('dashboard');
      })
  }
}

angular 
  .module('auth')
  .controller('LoginController', LoginController);